import Product from "../models/Product.model.js";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CONDITION_LABELS,
  PRODUCT_STATUS,
} from "../config/constants.js";

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const FAQS = [
  {
    keywords: ["safe", "safety", "scam", "fraud", "meet", "pickup"],
    answer:
      "For safer campus deals, meet in a public campus spot, inspect the item before paying, use UPI or cash only after verification, and report suspicious listings from the product page.",
  },
  {
    keywords: ["refund", "return", "cancel", "payment"],
    answer:
      "CampusMart connects student buyers and sellers, so refunds or returns should be agreed between both parties before pickup. If a payment issue looks suspicious, contact support with screenshots.",
  },
  {
    keywords: ["listing", "sell", "post", "upload"],
    answer:
      "To create a strong listing, add clear photos, a specific title, honest condition, original price, fair selling price, pickup details, and whether the price is negotiable.",
  },
  {
    keywords: ["boost", "promote", "visibility"],
    answer:
      "Boosting helps a listing appear more prominently. Use it for high-demand or time-sensitive items, and keep the title, price, and first image sharp before boosting.",
  },
  {
    keywords: ["wishlist", "favorite", "save"],
    answer:
      "Use the heart button on product cards to save items to your wishlist. Your wishlist is useful for comparing prices and tracking items you may buy later.",
  },
];

const CATEGORY_SYNONYMS = [
  ["electronics", ["phone", "laptop", "charger", "earphone", "headphone", "tablet", "keyboard", "mouse", "calculator"]],
  ["study_material", ["book", "books", "notes", "guide", "textbook", "study", "material"]],
  ["hostel_essentials", ["mattress", "bucket", "kettle", "lamp", "hostel", "bedsheet", "pillow"]],
  ["clothing", ["shirt", "jeans", "jacket", "hoodie", "dress", "clothes", "clothing"]],
  ["accessories", ["watch", "bag", "wallet", "accessory", "accessories"]],
  ["lab_equipment", ["lab", "coat", "equipment", "apron", "goggles"]],
  ["sports", ["bat", "football", "basketball", "racket", "sports"]],
  ["fitness", ["dumbbell", "yoga", "fitness", "gym"]],
  ["vehicles", ["cycle", "bike", "scooter", "vehicle", "bicycle"]],
  ["event_passes", ["ticket", "pass", "event", "concert"]],
];

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const compactProduct = (product) => ({
  _id: product._id,
  title: product.title,
  description: product.description,
  category: product.category,
  categoryLabel: PRODUCT_CATEGORY_LABELS[product.category] || product.category,
  condition: product.condition,
  conditionLabel: PRODUCT_CONDITION_LABELS[product.condition] || product.condition,
  selling_price: product.selling_price,
  original_price: product.original_price,
  images: product.images || [],
  slug: product.slug,
});

const inferCategory = (message) => {
  const text = message.toLowerCase();

  for (const category of Object.values(PRODUCT_CATEGORIES)) {
    if (text.includes(category.replaceAll("_", " "))) return category;
  }

  for (const [category, terms] of CATEGORY_SYNONYMS) {
    if (terms.some((term) => text.includes(term))) return category;
  }

  return null;
};

const inferBudget = (message) => {
  const budgetPattern = new RegExp(
    "(?:under|below|less than|max|budget|around|upto|up to)\\s*(?:rs\\.?|inr|\\u20b9)?\\s*(\\d{2,7})",
    "gi",
  );
  const matches = [...message.matchAll(budgetPattern)];
  if (matches.length) return Number(matches[matches.length - 1][1]);

  const rupeeMatch = message.match(
    new RegExp("(?:rs\\.?|inr|\\u20b9)\\s*(\\d{2,7})", "i"),
  );
  return rupeeMatch ? Number(rupeeMatch[1]) : null;
};

const buildSearchFilter = (message) => {
  const category = inferCategory(message);
  const maxPrice = inferBudget(message);
  const cleaned = message
    .toLowerCase()
    .replace(
      new RegExp(
        "(?:under|below|less than|max|budget|around|upto|up to)\\s*(?:rs\\.?|inr|\\u20b9)?\\s*\\d{2,7}",
        "gi",
      ),
      "",
    )
    .replace(/\b(find|show|search|need|want|buy|looking|for|me|please|best|cheap|affordable|recommend|suggest)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return { category, maxPrice, query: cleaned };
};

const searchProducts = async (message, limit = 5) => {
  const { category, maxPrice, query } = buildSearchFilter(message);
  const filter = {
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  };

  if (category) filter.category = category;
  if (maxPrice) filter.selling_price = { $lte: maxPrice };

  if (query.length >= 2) {
    const safeQuery = escapeRegex(query);
    filter.$or = [
      { title: { $regex: safeQuery, $options: "i" } },
      { description: { $regex: safeQuery, $options: "i" } },
      { category: { $regex: safeQuery, $options: "i" } },
    ];
  }

  let products = await Product.find(filter)
    .sort({ is_boosted: -1, views_count: -1, createdAt: -1 })
    .limit(limit)
    .select("title description category condition images selling_price original_price slug createdAt views_count")
    .lean();

  if (products.length === 0 && (category || query.length >= 2)) {
    products = await Product.find({
      is_deleted: false,
      status: PRODUCT_STATUS.LISTED,
      ...(category ? { category } : {}),
      ...(maxPrice ? { selling_price: { $lte: maxPrice } } : {}),
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("title description category condition images selling_price original_price slug createdAt views_count")
      .lean();
  }

  return products.map(compactProduct);
};

const getRecommendations = async (message, user) => {
  const products = await searchProducts(message, 6);

  if (products.length) {
    return products;
  }

  return await Product.find({
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  })
    .sort({ is_boosted: -1, views_count: -1, createdAt: -1 })
    .limit(6)
    .select("title description category condition images selling_price original_price slug createdAt views_count")
    .lean()
    .then((items) => items.map(compactProduct));
};

const estimatePrice = async (message) => {
  const category = inferCategory(message);
  const filter = {
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  };
  if (category) filter.category = category;

  const prices = await Product.find(filter)
    .sort({ createdAt: -1 })
    .limit(50)
    .select("selling_price")
    .lean();

  const numericPrices = prices
    .map((item) => item.selling_price)
    .filter((price) => Number.isFinite(price) && price > 0)
    .sort((a, b) => a - b);

  if (numericPrices.length === 0) {
    return null;
  }

  const median = numericPrices[Math.floor(numericPrices.length / 2)];
  return {
    category,
    sampleSize: numericPrices.length,
    low: Math.max(0, Math.round(median * 0.8)),
    fair: Math.round(median),
    high: Math.round(median * 1.15),
  };
};

const listingDraft = (message) => {
  const category = inferCategory(message) || PRODUCT_CATEGORIES.OTHERS;
  const rawName = message
    .replace(/\b(help|create|make|write|listing|list|sell|post|for|my|a|an|the)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const itemName = rawName || PRODUCT_CATEGORY_LABELS[category] || "Campus item";
  const title = `${itemName.replace(/^./, (char) => char.toUpperCase())} - student owned, ready for pickup`;

  return {
    title,
    category,
    categoryLabel: PRODUCT_CATEGORY_LABELS[category],
    description:
      `Selling ${itemName}. Mention the exact condition, age of use, included accessories, reason for selling, and pickup location. Add 2-3 clear photos from different angles for faster trust.`,
    tags: [
      PRODUCT_CATEGORY_LABELS[category] || "Campus",
      "student deal",
      "campus pickup",
      "negotiable",
    ],
  };
};

const answerFAQ = (message) => {
  const text = message.toLowerCase();
  return FAQS.find((faq) => faq.keywords.some((keyword) => text.includes(keyword)));
};

const detectIntent = (message) => {
  const text = message.toLowerCase();

  if (/\b(price|worth|estimate|fair value|how much)\b/.test(text)) return "price_estimate";
  if (/\b(listing|sell|post|upload|description|title)\b/.test(text)) return "listing_assistant";
  if (/\b(recommend|suggest|best|popular|trending)\b/.test(text)) return "recommendations";
  if (/\b(search|find|show|looking|buy|need|under|below)\b/.test(text)) return "product_search";
  if (answerFAQ(message)) return "faq";

  return "conversation";
};

const summarizeProducts = (products) => {
  if (!products.length) {
    return "I could not find matching active listings yet. Try a broader product name, category, or budget.";
  }

  const lines = products
    .slice(0, 3)
    .map((product, index) => {
      const price = INR_FORMATTER.format(product.selling_price || 0);
      return `${index + 1}. ${product.title} - Rs ${price}`;
    })
    .join("\n");

  return `I found these campus listings:\n${lines}\nOpen any card below to view details.`;
};

export const buildAssistantReply = async ({ message, history = [], user = null }) => {
  const text = String(message || "").trim();

  if (!text) {
    throw new Error("Message is required");
  }

  const intent = detectIntent(text);

  if (intent === "product_search") {
    const products = await searchProducts(text);
    return {
      intent,
      reply: summarizeProducts(products),
      products,
      suggestions: ["Show cheaper options", "Recommend similar items", "Help me compare"],
    };
  }

  if (intent === "recommendations") {
    const products = await getRecommendations(text, user);
    return {
      intent,
      reply: products.length
        ? `Here are ${products.length} recommendations based on active listings and campus demand signals.`
        : "I do not have enough active listings to recommend items yet.",
      products,
      suggestions: ["Find electronics under 5000", "Estimate a fair price", "Help me create a listing"],
    };
  }

  if (intent === "price_estimate") {
    const estimate = await estimatePrice(text);
    return {
      intent,
      reply: estimate
        ? `Based on ${estimate.sampleSize} recent active listings, a fair range is Rs ${INR_FORMATTER.format(estimate.low)} - Rs ${INR_FORMATTER.format(estimate.high)}. I would list near Rs ${INR_FORMATTER.format(estimate.fair)} and keep negotiation on.`
        : "I need more similar active listings before I can estimate a reliable price. Share the original price, condition, age, and category and I can still suggest a manual range.",
      estimate,
      suggestions: ["Help write the listing", "Search similar products", "What photos should I add?"],
    };
  }

  if (intent === "listing_assistant") {
    const draft = listingDraft(text);
    return {
      intent,
      reply: `Here is a starter listing:\nTitle: ${draft.title}\nCategory: ${draft.categoryLabel}\nDescription: ${draft.description}\nTags: ${draft.tags.join(", ")}`,
      draft,
      suggestions: ["Estimate price for this", "What photos should I upload?", "Find similar listings"],
    };
  }

  const faq = answerFAQ(text);
  if (faq) {
    return {
      intent: "faq",
      reply: faq.answer,
      suggestions: ["Find products", "Create a listing", "Talk to support"],
    };
  }

  const recentContext = history
    .slice(-2)
    .map((item) => item.text)
    .filter(Boolean)
    .join(" ");

  return {
    intent: "conversation",
    reply:
      `I can help you search products, estimate prices, write listings, answer marketplace questions, and recommend deals. Try something like "find a cycle under 3000" or "help me sell my calculator".${recentContext ? "" : ""}`,
    suggestions: ["Find a laptop under 30000", "Help me sell books", "Estimate price for my cycle"],
  };
};
