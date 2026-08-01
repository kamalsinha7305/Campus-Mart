import { GoogleGenAI } from "@google/genai";
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

const SOURCE_KB = "Unideals knowledge base";
const SOURCE_LIVE = "Live product database";
const SOURCE_GEMINI = "Gemini";
const normalizeGeminiModel = (model) => {
  const normalized = String(model || "gemini-flash-latest").replace(/^models\//, "");

  if (normalized === "gemini-2.5-flash") {
    return "gemini-flash-latest";
  }

  return normalized;
};

const GEMINI_MODEL = normalizeGeminiModel(process.env.GEMINI_MODEL);
const GEMINI_MODEL_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 30000);
const GEMINI_FALLBACK_MODELS = [];

const KNOWLEDGE_ANSWERS = [
  {
    intent: "marketplace_overview",
    keywords: ["what is unideals", "what is campusmart", "what is campus mart", "about unideals", "who can use"],
    answer:
      "UniDeals is a campus-focused peer-to-peer marketplace for students. Guests can browse public listings, while verified students can list products, wishlist items, manage profile/address details, report issues, contact support, and boost eligible listings.",
    suggestions: ["How do I sell something?", "Show product categories", "How do I stay safe?"],
  },
  {
    intent: "account_help",
    keywords: ["signup", "sign up", "register", "login", "verify email", "verification", "forgot password", "reset password", "google oauth", "blocked account"],
    answer:
      "Create an account at /signup, then verify your email through the verification flow. Password reset starts at /forgot-password and continues from the reset link. Google sign-in is supported when configured. If your account is blocked or restricted, contact support from /contact.",
    suggestions: ["How do I delete my account?", "Open support", "What can guests do?"],
  },
  {
    intent: "listing_rules",
    keywords: ["sell something", "sell my", "how do i sell", "create listing", "upload product", "product photos", "draft", "list item", "remove listing", "unlist", "relist"],
    answer:
      "To sell, go to /upload and add a title, description, category, condition, usage details, purchase date, 1-3 images, selling/original price, payment preference, and pickup address. Drafts can be incomplete. You can unlist, relist, or soft-delete your own listings later.",
    suggestions: ["Help me write a listing", "Estimate a fair price", "What categories are available?"],
  },
  {
    intent: "categories",
    keywords: ["category", "categories", "types of products", "what can i sell"],
    answer:
      "UniDeals categories are Electronics, Study Material, Hostel Essentials, Clothing, Accessories, Lab Equipment, Sports, Fitness, Vehicles, Event Passes, and Others.",
    suggestions: ["Find electronics", "Help me sell books", "Find a cycle under 3000"],
  },
  {
    intent: "payment_policy",
    keywords: ["payment", "upi", "cash", "refund", "return", "escrow", "buyer protection"],
    answer:
      "Listings can support cash, UPI, or both. UniDeals does not hold funds, provide escrow, or run a platform-level return system. Buyers and sellers should agree payment, refund, and pickup terms directly before completing a deal.",
    suggestions: ["How do I stay safe?", "How do I report a scam?", "Find products"],
  },
  {
    intent: "safety_report",
    keywords: ["report", "scam", "fraud", "unsafe", "safety", "harassment", "fake listing", "prohibited"],
    answer:
      "For safer deals, meet in a public, well-lit campus spot, inspect the item before paying, and avoid sharing private home details. To report a product or user, use the report flow or /contact. For immediate physical danger, contact campus security or local authorities first, then report in UniDeals.",
    suggestions: ["Report reasons", "Contact support", "What payment methods work?"],
  },
  {
    intent: "boosting",
    keywords: ["boost", "boosting", "promote", "visibility", "subscription", "pro plus"],
    answer:
      "Boosting makes a listing more visible. Base users get 2 boosts per month for 1 hour with 1 active boost. Pro gets 10 per month for 3 hours with 1 active boost. Pro Plus gets 30 per month for 3 hours with up to 3 active boosts.",
    suggestions: ["Help improve my listing", "Estimate a fair price", "Recommend products"],
  },
  {
    intent: "support",
    keywords: ["support", "contact", "help", "feature request", "bug", "issue", "email"],
    answer:
      "Use /contact for support, issue reports, or feature suggestions. The displayed support email is hi@unideals.in, and the support UI mentions responses under 2 hours during campus hours, 9 AM - 9 PM.",
    suggestions: ["How do I report a scam?", "Account help", "Privacy questions"],
  },
  {
    intent: "privacy_terms",
    keywords: ["privacy", "data", "delete account", "terms", "personal data", "sell my data"],
    answer:
      "The privacy policy says UniDeals does not sell, rent, or trade personal data. Users can request access, correction, deletion, portability, or objection by emailing privacy@campusmart.in. Account deletion is permanent from the user's perspective, so review it carefully before confirming.",
    suggestions: ["Account help", "Contact support", "Safety guidance"],
  },
  {
    intent: "routes_help",
    keywords: ["route", "page", "where do i go", "open", "navigation", "/upload", "/wishlist", "/chat", "/contact"],
    answer:
      "Useful pages: / for the product feed, /search for search results, /product/:id for product details, /upload for listing an item, /wishlist for saved products, /chat for messages and the assistant, /contact for support, and /settings for account settings.",
    suggestions: ["How do I sell something?", "How does wishlist work?", "Contact support"],
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

const answerKnowledge = (message) => {
  const text = message.toLowerCase();
  return KNOWLEDGE_ANSWERS.find((entry) =>
    entry.keywords.some((keyword) => text.includes(keyword)),
  );
};

const detectIntent = (message) => {
  const text = message.toLowerCase();
  const knowledge = answerKnowledge(message);

  if (/\b(price|worth|estimate|fair value|how much)\b/.test(text)) return "price_estimate";
  if (/\bhow\b/.test(text) && /\b(sell|post|upload|list)\b/.test(text)) {
    return "listing_rules";
  }
  if (
    knowledge &&
    /\b(how|what|where|can|does|do|policy|rules|safe|support|contact|report)\b/.test(text)
  ) {
    return knowledge.intent;
  }
  if (/\b(listing|sell|post|upload|description|title)\b/.test(text)) return "listing_assistant";
  if (/\b(recommend|suggest|best|popular|trending)\b/.test(text)) return "recommendations";
  if (/\b(search|find|show|looking|buy|need|under|below)\b/.test(text)) return "product_search";
  if (knowledge) return knowledge.intent;
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

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) return null;

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

const getGeminiModels = () => {
  const configuredFallbacks = String(process.env.GEMINI_FALLBACK_MODELS || "")
    .split(",")
    .map((model) => normalizeGeminiModel(model.trim()))
    .filter(Boolean);

  return [...new Set([GEMINI_MODEL, ...configuredFallbacks, ...GEMINI_FALLBACK_MODELS])];
};

const withTimeout = (promise, timeoutMs, label) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
    }),
  ]);

const getKnowledgeContext = () =>
  KNOWLEDGE_ANSWERS.map((entry) => ({
    intent: entry.intent,
    keywords: entry.keywords,
    facts: entry.answer,
  }));

const parseGeminiJson = (text) => {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

const buildGeminiPrompt = ({ message, history, baseReply }) =>
  JSON.stringify(
    {
      userMessage: message,
      recentHistory: history
        .slice(-8)
        .map((item) => ({
          sender: item.sender,
          text: item.text,
        }))
        .filter((item) => item.text),
      detectedIntent: baseReply.intent,
      groundingContext: {
        fallbackAnswerForEmergencyOnly: baseReply.reply,
        liveProducts: baseReply.products || [],
        priceEstimate: baseReply.estimate || null,
        listingDraft: baseReply.draft || null,
        platformKnowledge: getKnowledgeContext(),
      },
      currentSuggestions: baseReply.suggestions || [],
      responseRules: [
        "Answer the user's exact question in a natural, student-friendly tone. Sound helpful and specific, not like a copied policy block.",
        "Start with the useful answer immediately. Avoid filler like 'Sure', 'I can help', or long introductions.",
        "Choose the structure that fits the question: one short paragraph for simple answers, numbered steps for processes, bullets for options or comparisons.",
        "Use bold labels sparingly for scanability, for example '**Price:**' or '**Next step:**'. Do not bold every sentence.",
        "Keep most answers between 40 and 120 words. If the user asks for detail, provide enough detail but keep it organized.",
        "For product searches or recommendations, summarize the best matches briefly and point to the product cards below. Do not invent products that are not in liveProducts.",
        "For listing help, give practical steps and concrete wording the seller can use. If listingDraft is present, improve it instead of copying it blindly.",
        "For price estimates, explain the range clearly and mention that it is based on available active listings when a priceEstimate exists.",
        "For platform rules, payments, refunds, boosts, reports, privacy, and safety, stay strictly within platformKnowledge and groundingContext.",
        "Never promise inventory availability, refunds, escrow, buyer protection, legal outcomes, account state, or private user data unless supplied in groundingContext.",
        "If there is immediate physical danger, tell the user to contact campus security or local authorities first, then report it in UniDeals.",
        "Return 2-4 relevant suggestion prompts that continue the conversation naturally.",
      ],
    },
    null,
    2,
  );

const refineWithGemini = async ({ message, history, baseReply }) => {
  const ai = getGeminiClient();
  if (!ai) {
    return {
      ...baseReply,
      aiPowered: false,
    };
  }

  try {
    let response = null;
    let usedModel = GEMINI_MODEL;
    let lastModelError = null;

    for (const model of getGeminiModels()) {
      try {
        response = await withTimeout(
          ai.models.generateContent({
            model,
            contents: buildGeminiPrompt({ message, history, baseReply }),
            config: {
              maxOutputTokens: 700,
              responseMimeType: "application/json",
              systemInstruction:
                "You are UniDeals Assistant, a Gemini-powered assistant for a campus student marketplace. Give direct, natural, well-structured answers using only the supplied grounding context, live product data, price estimate, listing draft, platform knowledge, and conversation history. Be concise but not robotic. Prefer practical wording, clear next steps, and short markdown lists when useful. Do not start with a capability pitch. Do not add unsupported facts. Return valid JSON only with keys: reply string, suggestions string array.",
            },
          }),
          GEMINI_MODEL_TIMEOUT_MS,
          model,
        );
        usedModel = model;
        break;
      } catch (error) {
        lastModelError = error;
        console.error(`Gemini model fallback (${model}):`, error.message);
      }
    }

    if (!response) {
      throw lastModelError || new Error("No Gemini model returned a response.");
    }

    const parsed = parseGeminiJson(response.text);
    const reply = typeof parsed?.reply === "string" ? parsed.reply.trim() : "";
    const suggestions = Array.isArray(parsed?.suggestions)
      ? parsed.suggestions.filter((item) => typeof item === "string").slice(0, 4)
      : baseReply.suggestions;

    if (!reply) return baseReply;

    return {
      ...baseReply,
      reply,
      suggestions: suggestions?.length ? suggestions : baseReply.suggestions,
      sources: [...new Set([SOURCE_GEMINI, ...(baseReply.sources || [])])],
      aiPowered: true,
      model: usedModel,
    };
  } catch (error) {
    console.error("Gemini assistant fallback:", error);
    return {
      ...baseReply,
      aiPowered: false,
      aiError:
        process.env.NODE_ENV === "production"
          ? "Gemini unavailable; used local assistant fallback."
          : `Gemini unavailable: ${error.message}`,
    };
  }
};

const buildRuleBasedAssistantReply = async ({ message, history = [], user = null }) => {
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
      sources: [SOURCE_LIVE],
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
      sources: [SOURCE_LIVE],
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
      sources: [SOURCE_LIVE, SOURCE_KB],
    };
  }

  if (intent === "listing_assistant") {
    const draft = listingDraft(text);
    return {
      intent,
      reply: `Here is a starter listing:\nTitle: ${draft.title}\nCategory: ${draft.categoryLabel}\nDescription: ${draft.description}\nTags: ${draft.tags.join(", ")}`,
      draft,
      suggestions: ["Estimate price for this", "What photos should I upload?", "Find similar listings"],
      sources: [SOURCE_KB],
    };
  }

  if (intent === "listing_rules") {
    const listingHelp = KNOWLEDGE_ANSWERS.find(
      (entry) => entry.intent === "listing_rules",
    );

    return {
      intent,
      reply: listingHelp.answer,
      suggestions: listingHelp.suggestions,
      sources: [SOURCE_KB],
    };
  }

  const knowledge = answerKnowledge(text);
  if (knowledge) {
    return {
      intent: knowledge.intent,
      reply: knowledge.answer,
      suggestions: knowledge.suggestions,
      sources: [SOURCE_KB],
    };
  }

  const faq = answerFAQ(text);
  if (faq) {
    return {
      intent: "faq",
      reply: faq.answer,
      suggestions: ["Find products", "Create a listing", "Talk to support"],
      sources: [SOURCE_KB],
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
      `Ask me a specific UniDeals question, such as "find a cycle under 3000", "write a listing for my calculator", or "how do I report a scam?".${recentContext ? "" : ""}`,
    suggestions: ["Find a laptop under 30000", "Write a product listing", "How do I report a scam?"],
    sources: [SOURCE_KB],
  };
};

export const buildAssistantReply = async ({ message, history = [], user = null }) => {
  const baseReply = await buildRuleBasedAssistantReply({ message, history, user });

  return refineWithGemini({
    message: String(message || "").trim(),
    history,
    baseReply,
  });
};
