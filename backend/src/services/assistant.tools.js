import { Type } from "@google/genai";
import Product from "../models/Product.model.js";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUS,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CONDITION_LABELS,
} from "../config/constants.js";
import {
  TERMS_AND_CONDITIONS,
  SUBSCRIPTION_PLANS,
  STEP_BY_STEP_GUIDES,
} from "../config/knowledgeBase.js";

const compactProduct = (product) => {
  if (!product) return null;
  return {
    _id: product._id,
    title: product.title,
    description: product.description,
    category: product.category,
    categoryLabel: PRODUCT_CATEGORY_LABELS[product.category] || product.category,
    condition: product.condition,
    conditionLabel: PRODUCT_CONDITION_LABELS[product.condition] || product.condition,
    selling_price: product.selling_price,
    original_price: product.original_price,
    images: product.images?.map(img => typeof img === 'string' ? img : img.url) || [],
    slug: product.slug,
    views_count: product.views_count,
    is_boosted: product.is_boosted,
    is_negotiable: product.is_negotiable,
    brand: product.attributes?.brand,
  };
};

export const toolDeclarations = [
  {
    name: "searchProducts",
    description: "Search for products based on query, category, price range, and condition.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: { type: Type.STRING, description: "Search query or keyword" },
        category: { type: Type.STRING, description: "Category of the product" },
        maxPrice: { type: Type.NUMBER, description: "Maximum selling price" },
        minPrice: { type: Type.NUMBER, description: "Minimum selling price" },
        condition: { type: Type.STRING, description: "Condition of the product" },
        sortBy: { type: Type.STRING, description: "Sort criteria", enum: ["newest", "price_low", "price_high", "most_viewed"] },
        limit: { type: Type.INTEGER, description: "Number of results to return (default 5)" }
      }
    }
  },
  {
    name: "getProductDetails",
    description: "Get full details of a specific product using its ID.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        productId: { type: Type.STRING, description: "The ID of the product" }
      },
      required: ["productId"]
    }
  },
  {
    name: "estimateFairPrice",
    description: "Estimate fair selling price based on category or keyword.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING, description: "Category to estimate for" },
        keyword: { type: Type.STRING, description: "Keyword to narrow down estimation" }
      }
    }
  },
  {
    name: "getCategoryDemandStats",
    description: "Get demand statistics grouped by product category.",
    parameters: {
      type: Type.OBJECT,
      properties: {}
    }
  },
  {
    name: "generateListingDraft",
    description: "Generate a structured listing draft based on user input.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        itemDescription: { type: Type.STRING, description: "Description of the item" },
        condition: { type: Type.STRING, description: "Condition of the item" },
        originalPrice: { type: Type.NUMBER, description: "Original price of the item" },
        category: { type: Type.STRING, description: "Suggested category" }
      },
      required: ["itemDescription"]
    }
  },
  {
    name: "getTrendingProducts",
    description: "Get currently trending and boosted products.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        limit: { type: Type.INTEGER, description: "Number of products to return (default 6)" }
      }
    }
  },
  {
    name: "compareTwoProducts",
    description: "Compare two products by their IDs.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        productId1: { type: Type.STRING, description: "ID of the first product" },
        productId2: { type: Type.STRING, description: "ID of the second product" }
      },
      required: ["productId1", "productId2"]
    }
  },
  {
    name: "getBudgetBundle",
    description: "Get a bundle of affordable items within a specific total budget.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        totalBudget: { type: Type.NUMBER, description: "Total budget amount" },
        categories: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Categories to include in bundle" }
      },
      required: ["totalBudget"]
    }
  },
  {
    name: "getInspectionChecklist",
    description: "Get an inspection checklist for a specific product category.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING, description: "Category of the product" }
      },
      required: ["category"]
    }
  },
  {
    name: "getSafetyTips",
    description: "Get safety tips for transactions or meetups.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING, description: "Topic like meetup, payment, scam, general" }
      }
    }
  },
  {
    name: "getPlatformGuide",
    description: "Get step-by-step instructions on how to use any feature of the UniDeals website (e.g. how to sell, how to buy, how to boost, how to upgrade, how to wishlist, how to edit profile, how to report).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        topic: { 
          type: Type.STRING, 
          description: "Topic of the guide (how_to_sell, how_to_buy, how_to_boost, how_to_upgrade, how_to_wishlist, how_to_profile_settings, how_to_report_safety, how_to_use_ai)" 
        }
      },
      required: ["topic"]
    }
  },
  {
    name: "getTermsAndPolicies",
    description: "Get official UniDeals Terms and Conditions, platform rules, prohibited items, eligibility criteria, and dispute policies.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        section: { 
          type: Type.STRING, 
          description: "Specific section id (eligibility, role, prohibited_items, safety_payments, listings_ownership, liability_disputes, all)" 
        }
      }
    }
  }
];

export const toolHandlers = {
  searchProducts: async (args) => {
    const { query, category, maxPrice, minPrice, condition, sortBy = "newest", limit = 5 } = args;
    const filter = { is_deleted: false, status: PRODUCT_STATUS.LISTED };
    
    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    
    if (maxPrice !== undefined || minPrice !== undefined) {
      filter.selling_price = {};
      if (maxPrice !== undefined) filter.selling_price.$lte = maxPrice;
      if (minPrice !== undefined) filter.selling_price.$gte = minPrice;
    }
    
    if (query && query.length >= 2) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ];
    }
    
    let sortOptions = { createdAt: -1 };
    if (sortBy === "price_low") sortOptions = { selling_price: 1 };
    else if (sortBy === "price_high") sortOptions = { selling_price: -1 };
    else if (sortBy === "most_viewed") sortOptions = { views_count: -1 };
    
    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(limit)
      .select("title description category condition images selling_price original_price slug views_count is_boosted is_negotiable attributes")
      .lean();
      
    return { products: products.map(compactProduct) };
  },

  getProductDetails: async (args) => {
    const { productId } = args;
    let product;
    
    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId).lean();
    } else {
      product = await Product.findOne({ slug: productId }).lean();
    }
    
    if (!product) throw new Error("Product not found");
    return { product: compactProduct(product) };
  },

  estimateFairPrice: async (args) => {
    const { category, keyword } = args;
    const filter = { is_deleted: false, status: PRODUCT_STATUS.LISTED };
    
    if (category) filter.category = category;
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ];
    }
    
    const products = await Product.find(filter).select("selling_price").lean();
    
    if (!products.length) return { error: "Not enough data" };
    
    const prices = products.map(p => p.selling_price).sort((a, b) => a - b);
    const min = prices[0];
    const max = prices[prices.length - 1];
    const sum = prices.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / prices.length);
    const median = prices[Math.floor(prices.length / 2)];
    
    return { low: min, fair: median, high: max, average, sampleSize: prices.length, category };
  },

  getCategoryDemandStats: async () => {
    const stats = await Product.aggregate([
      { $match: { is_deleted: false, status: PRODUCT_STATUS.LISTED } },
      { $group: { _id: "$category", count: { $sum: 1 }, avgViews: { $avg: "$views_count" } } },
      { $sort: { count: -1 } }
    ]);
    return { stats };
  },

  generateListingDraft: async (args) => {
    const { itemDescription, condition, originalPrice, category } = args;
    
    const words = itemDescription.split(" ").slice(0, 5).join(" ");
    const title = `${words.charAt(0).toUpperCase() + words.slice(1)} - student owned, campus pickup`;
    
    const draft = {
      title,
      category: category || "other",
      categoryLabel: category || "Other",
      description: `Selling my ${itemDescription}.\nCondition: ${condition || "Used"}\n\nKey details:\n- [Add detail here]\n- [Add detail here]\n\nAvailable for immediate campus pickup!`,
      tags: itemDescription.split(" ").filter(w => w.length > 3).slice(0, 5),
      pricingAdvice: "Check similar items on campus for fair pricing."
    };
    
    return { draft };
  },

  getTrendingProducts: async (args) => {
    const limit = args.limit || 6;
    const products = await Product.find({ is_deleted: false, status: PRODUCT_STATUS.LISTED })
      .sort({ is_boosted: -1, views_count: -1, createdAt: -1 })
      .limit(limit)
      .lean();
    return { products: products.map(compactProduct) };
  },

  compareTwoProducts: async (args) => {
    const { productId1, productId2 } = args;
    const query1 = productId1.match(/^[0-9a-fA-F]{24}$/) ? { _id: productId1 } : { slug: productId1 };
    const query2 = productId2.match(/^[0-9a-fA-F]{24}$/) ? { _id: productId2 } : { slug: productId2 };
    
    const [p1, p2] = await Promise.all([
      Product.findOne(query1).lean(),
      Product.findOne(query2).lean()
    ]);
    
    if (!p1 || !p2) throw new Error("One or both products not found");
    
    return { product1: compactProduct(p1), product2: compactProduct(p2) };
  },

  getBudgetBundle: async (args) => {
    const { totalBudget, categories = ["hostel_essentials", "electronics", "study_material"] } = args;
    const products = [];
    let remainingBudget = totalBudget;
    
    for (const cat of categories) {
      if (remainingBudget <= 0) break;
      const cheapest = await Product.findOne({ 
        category: cat, 
        is_deleted: false, 
        status: PRODUCT_STATUS.LISTED,
        selling_price: { $lte: remainingBudget }
      }).sort({ selling_price: 1 }).lean();
      
      if (cheapest) {
        products.push(compactProduct(cheapest));
        remainingBudget -= cheapest.selling_price;
      }
    }
    
    const totalCost = totalBudget - remainingBudget;
    const budgetUsedPercent = Math.round((totalCost / totalBudget) * 100);
    
    return { products, totalCost, remainingBudget, budgetUsedPercent };
  },

  getInspectionChecklist: async (args) => {
    const { category } = args;
    const checklists = {
      electronics: ["Check battery health", "Inspect screen for scratches/cracks", "Test charger and all ports", "Verify Wi-Fi/Bluetooth connectivity"],
      vehicles: ["Test brakes and gears", "Check tyre tread and pressure", "Inspect chain/belt", "Test lights and horn if applicable"],
      study_material: ["Check for missing pages", "Look for excessive highlighting or notes", "Verify edition/publication year"],
      hostel_essentials: ["Verify working condition", "Check cleanliness/hygiene", "Inspect for any physical damage"]
    };
    
    return { 
      category, 
      checklist: checklists[category] || ["Check overall condition", "Verify it matches description", "Test functionality if applicable"] 
    };
  },

  getSafetyTips: async (args) => {
    const { topic = "general" } = args;
    const tips = {
      meetup: ["Always meet in public campus locations during daylight", "Take a friend with you if possible", "Inform someone about your meetup details"],
      payment: ["Prefer digital payments (UPI) at the time of exchange", "Do not pay anything in advance", "Verify payment confirmation on your own app"],
      scam: ["Beware of deals that seem too good to be true", "Do not click on suspicious QR codes for receiving money", "Avoid buyers/sellers who refuse to meet on campus"],
      general: ["Communicate only through the platform if possible", "Trust your instincts, walk away if something feels off", "Check the user's profile and reviews"]
    };
    
    return { topic, tips: tips[topic] || tips.general };
  },

  getPlatformGuide: async (args) => {
    const { topic } = args;
    const guide = STEP_BY_STEP_GUIDES.find((g) => g.topic === topic || g.topic.includes(topic));
    if (guide) {
      return { guide };
    }
    return { 
      guide: {
        title: "UniDeals Platform Guide",
        steps: [
          "Explore listings from the Home page.",
          "Use the Search bar or Categories to find student deals.",
          "Click 'Sell' at `/upload` to post your own item.",
          "Chat with sellers in-app to arrange a safe public meetup on campus!"
        ]
      }
    };
  },

  getTermsAndPolicies: async (args) => {
    const { section } = args;
    if (section && section !== "all") {
      const sec = TERMS_AND_CONDITIONS.sections.find((s) => s.id === section);
      if (sec) {
        return {
          summary: TERMS_AND_CONDITIONS.summary,
          section: sec
        };
      }
    }
    return {
      summary: TERMS_AND_CONDITIONS.summary,
      sections: TERMS_AND_CONDITIONS.sections
    };
  }
};
