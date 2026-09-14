/**
 * UniDeals Official Platform Knowledge Base
 * Covers Terms & Conditions, Privacy, Safety, Monetization & Step-by-Step Platform Guides
 */

export const TERMS_AND_CONDITIONS = {
  summary: "UniDeals (Campus-Mart) is a peer-to-peer campus marketplace exclusively for verified Indian university students to buy, sell, and exchange items safely within their college community.",
  sections: [
    {
      id: "eligibility",
      title: "1. Eligibility & Accounts",
      rules: [
        "Must be at least 18 years of age.",
        "Must be an active student enrolled at a recognized Indian college or university.",
        "Must verify student email (@college.edu / @domain.ac.in) to buy or sell.",
        "Strict one account per person policy. Duplicate or fake accounts result in permanent suspension."
      ]
    },
    {
      id: "role",
      title: "2. Platform Role & Transactions",
      rules: [
        "UniDeals is a technology facilitator connecting campus buyers and sellers.",
        "UniDeals does NOT hold funds, manage escrow, or take title to goods.",
        "All transactions, price negotiations, inspections, and handovers happen directly between the student buyer and seller."
      ]
    },
    {
      id: "prohibited_items",
      title: "3. Prohibited Items & Activities",
      rules: [
        "STRICTLY PROHIBITED: Alcohol, drugs, prescription medicines, tobacco, weapons, knives, explosives, counterfeit products, stolen goods, adult content, academic dishonesty materials (exam leaks), and unauthorized commercial bulk reselling.",
        "Bait-and-switch pricing or misrepresenting product condition is strictly banned.",
        "Harassment, abusive language, or discriminating against other students is grounds for immediate account termination."
      ]
    },
    {
      id: "safety_payments",
      title: "4. Payments & Safety Protocols",
      rules: [
        "NEVER pay advance or token amounts online before meeting and physically inspecting the item.",
        "Always meet in public, well-lit campus locations (e.g. Central Library Gate, Main Canteen, Student Activity Center, Main Hostel Security).",
        "Make payments directly via UPI (GPay/PhonePe/Paytm) or cash ONLY after you have verified the product condition in person."
      ]
    },
    {
      id: "listings_ownership",
      title: "5. Listings & Content Rules",
      rules: [
        "Sellers must own the item and have the legal right to sell it.",
        "Photos must be real pictures of the actual item (maximum 3 images per listing).",
        "Selling price cannot exceed the original MRP or purchase price.",
        "UniDeals reserves the right to moderate or remove misleading or flagged listings."
      ]
    },
    {
      id: "liability_disputes",
      title: "6. Liability & Dispute Resolution",
      rules: [
        "UniDeals is not liable for transaction losses or disputes between students.",
        "Platform liability is capped at ₹1,000 under applicable Indian law.",
        "Users can report suspicious users or scams via the flag button or by emailing support@campusmart.in."
      ]
    }
  ]
};

export const SUBSCRIPTION_PLANS = {
  founderOffer: "Lifetime access at launch pricing for early campus members!",
  plans: {
    free: {
      name: "Free Plan",
      price: "₹0",
      activeListings: 10,
      monthlyBoosts: 0,
      wishlistLimit: 25,
      searchPriority: "Standard",
      support: "Standard Community Support"
    },
    pro: {
      name: "Pro Founder Plan",
      price: "₹99 (Lifetime)",
      activeListings: 25,
      monthlyBoosts: "2 Boosts / month (3-Day Duration each)",
      wishlistLimit: 100,
      searchPriority: "High Priority in Campus Search",
      support: "Priority Support"
    },
    pro_plus: {
      name: "Pro+ Founder Plan",
      price: "₹199 (Lifetime)",
      activeListings: "Unlimited",
      monthlyBoosts: "5 Boosts / month (7-Day Duration each)",
      wishlistLimit: "Unlimited",
      searchPriority: "Highest Priority (Top of Campus Search)",
      support: "Dedicated 24/7 Priority Support"
    }
  },
  boostAddons: [
    { type: "3-Day Listing Boost", price: "₹29", benefit: "Boosts item to top of campus search for 3 days" },
    { type: "7-Day Listing Boost", price: "₹49", benefit: "Boosts item to top of campus search for 7 days" }
  ]
};

export const STEP_BY_STEP_GUIDES = [
  {
    topic: "how_to_sell",
    title: "How to List & Sell an Item on UniDeals",
    steps: [
      "Step 1: Click the 'Sell' or '+' button in the navbar, or navigate to `/upload`.",
      "Step 2: Enter Product Title, select Category, and choose Condition (Brand New, Like New, Gently Used, etc.).",
      "Step 3: Click '✨ AI Polish' next to Description to let Gemini AI auto-generate an attractive title, structured description, and tags from your rough notes!",
      "Step 4: Upload up to 3 clear photos of your item (front, back, and any wear/accessories).",
      "Step 5: Set your Selling Price (ensure it's below or equal to original price) and specify your Campus Pickup Location (Hostel/Gate/Block).",
      "Step 6: Review in Preview step and click 'Publish Listing'. Your item is now live for all students on campus!"
    ]
  },
  {
    topic: "how_to_buy",
    title: "How to Buy an Item & Contact a Seller",
    steps: [
      "Step 1: Use the Search bar on the homepage or browse by category (Electronics, Vehicles, Study Material, Hostel Essentials, etc.).",
      "Step 2: Click on any product card to view the detailed page (`/product/:id`).",
      "Step 3: Click '✨ Ask AI: Fair Price & Inspection Tips' to instantly check if the price is fair and view inspection advice.",
      "Step 4: Click 'Chat with Seller' to open direct in-app chat with the student seller.",
      "Step 5: Agree on a public campus meetup spot (Library, Canteen, Student Activity Center) and daylight time.",
      "Step 6: Meet, inspect the item thoroughly, and make payment directly via UPI (GPay/PhonePe/Paytm) or cash."
    ]
  },
  {
    topic: "how_to_boost",
    title: "How to Boost a Listing to Sell Faster",
    steps: [
      "Step 1: Go to your profile menu and click 'My Listings' (`/productlisted`).",
      "Step 2: Find the active product you want to promote and click 'Boost Listing'.",
      "Step 3: Choose to use your monthly subscription boost credits (Pro/Pro+) or purchase a 3-Day (₹29) or 7-Day (₹49) add-on.",
      "Step 4: Confirm boost. Your item will immediately appear at the top of category searches with a 'Boosted' badge for 3x more views!"
    ]
  },
  {
    topic: "how_to_upgrade",
    title: "How to Upgrade to Pro or Pro+ Subscription",
    steps: [
      "Step 1: Click on 'Subscription' in your profile menu or navigate to `/subscription` (or `/price`).",
      "Step 2: Choose between Pro (₹99 Lifetime) and Pro+ (₹199 Lifetime).",
      "Step 3: Click 'Upgrade Now' and complete the secure payment.",
      "Step 4: Instant activation! You'll receive monthly boost credits, unlimited/extended listings, and highest search visibility."
    ]
  },
  {
    topic: "how_to_wishlist",
    title: "How to Save Products to Wishlist",
    steps: [
      "Step 1: On any product card or on the product detail page, click the Heart (❤️) icon.",
      "Step 2: The item is instantly saved to your personal Wishlist.",
      "Step 3: Access all saved items anytime by navigating to `/wishlist` from your profile menu."
    ]
  },
  {
    topic: "how_to_profile_settings",
    title: "How to Edit Profile, Avatar & Campus Address",
    steps: [
      "Step 1: Click your avatar on the top right and select 'Settings' (`/settings`) or 'Profile' (`/profile`).",
      "Step 2: Update your Name, Mobile Number, Gender, or upload a new Profile Photo.",
      "Step 3: Update your default Campus Pickup Address (Hostel block, Room number, City, Pincode).",
      "Step 4: Click 'Save Changes'."
    ]
  },
  {
    topic: "how_to_report_safety",
    title: "How to Report a Suspicious Listing or User",
    steps: [
      "Step 1: Open the suspicious product page or user profile.",
      "Step 2: Click the 'Report / Flag' icon.",
      "Step 3: Select reason (Suspicious pricing, Scam/Fake item, Prohibited product, Harassment).",
      "Step 4: Submit report. Our campus moderation team reviews flagged items within 2 hours. For emergency support, email support@campusmart.in."
    ]
  },
  {
    topic: "how_to_use_ai",
    title: "How to Use the UniDeals AI Assistant",
    steps: [
      "Step 1: Click the floating chat bubble in the bottom-right corner of any page, or visit `/chat`.",
      "Step 2: Ask anything in English or Hinglish (e.g. 'Find cycle under ₹3000', 'Estimate price for my calculator', 'Help me write a listing for books', 'What should I check before buying a laptop?').",
      "Step 3: The AI will generate interactive product cards, price range bars, copyable listing drafts, and checkable inspection lists!"
    ]
  }
];

export const FAQ_SECTION_LIBRARY = {
  terms: {
    title: "Terms, rules, eligibility, and safety",
    keywords: [
      "terms", "conditions", "rules", "legal", "policy", "policies", "prohibited", "illegal", "age", "eligible", "eligibility",
      "student verification", "one account", "duplicate account", "fake account", "fair pricing", "misrepresent", "harassment",
      "banned items", "weapons", "drugs", "alcohol", "prescription medicine", "tobacco", "counterfeit", "stolen goods",
      "fraud", "scam", "liability", "dispute", "resolved", "termination", "suspended", "account ban", "code of conduct",
      "what are the rules", "what is prohibited", "can i sell", "can i buy", "safety policy", "campus safety", "report scam",
      "user conduct", "misleading listing", "refund", "escrow", "pay advance", "deposit", "prohibited goods", "fake review"
    ],
    questions: [
      "What are the platform rules?",
      "Who can use UniDeals?",
      "What items are strictly prohibited?",
      "Can I sell alcohol, drugs, or weapons?",
      "Is it allowed to use more than one account?",
      "What happens if I fake a product listing?",
      "What if a buyer or seller is abusive or harassing me?",
      "Can I list a stolen item?",
      "What are the safety requirements for meetups?",
      "What is the platform's liability if a deal goes wrong?",
      "Do I need to pay a deposit or escrow?",
      "What are the terms for scam reports?",
      "What happens if my account is flagged?",
      "Can I sell counterfeit products?",
      "Are fake reviews or bait-and-switch listings allowed?",
      "What if I accidentally post the wrong product detail?"
    ],
    answer: "UniDeals is a student-only campus marketplace. Users must be 18+, active students, and verified through a valid college or university email. Each person can have one account only. Listings must be honest, legal, and accurately described. Prohibited goods include alcohol, drugs, prescription medicines, weapons, explosives, adult content, fake or counterfeit items, stolen goods, academic cheating materials, and unauthorized commercial bulk reselling. UniDeals does not hold funds or manage escrow, and all direct transactions happen between buyers and sellers. Users must meet in public campus areas, avoid advance payments, and report suspicious activity through the in-app flag/report feature or support. If a listed item is misleading, fraudulent, or unsafe, the listing may be moderated or removed and the account may be suspended."
  },
  privacy: {
    title: "Privacy, data handling, and account management",
    keywords: [
      "privacy", "data", "personal data", "delete account", "remove data", "cookies", "messages stored", "account deletion",
      "delete my data", "erase account", "visible info", "profile visibility", "personal information", "privacy policy",
      "who can see my details", "what data is stored", "account data", "phone number", "email visibility", "verification data",
      "delete my account", "close account", "deactivate account", "remove my profile", "data retention", "privacy request"
    ],
    questions: [
      "What data does UniDeals collect?",
      "Is my phone number visible to everyone?",
      "Are my chats stored?",
      "Can I delete my account?",
      "How long do you keep my data?",
      "Can I request my data to be removed?",
      "Do you share my info with third parties?",
      "Is my university email visible to others?",
      "What is used for student verification?",
      "What happens if I want to leave the platform?"
    ],
    answer: "UniDeals collects the information needed to run and secure the marketplace: profile details, verification data, listing data, messages, product interactions, and usage information. This is used to verify students, power the marketplace, prevent abuse, support chat conversations, and improve the platform. UniDeals does not sell or trade personal data. Students can request deletion of their account through a privacy request at privacy@campusmart.in. Some records may be retained if required by law or for fraud investigation, but generally account data is removed within 30 days after a valid deletion request."
  },
  subscription: {
    title: "Plans, pricing, upgrades, and boosts",
    keywords: [
      "subscription", "plan", "plans", "pricing", "cost", "fee", "free", "pro", "pro+", "upgrade", "tier", "founder", "lifetime",
      "membership", "monthly fee", "annual fee", "paid plan", "boost", "boosts", "add on", "addon", "search priority", "top search",
      "why pay", "what is free plan", "what does pro include", "pro plus", "discount", "offer", "founder offer", "lifetime price",
      "launch pricing", "what is the cheapest plan", "can i upgrade later", "limit of listings", "wishlist limit", "boost credits"
    ],
    questions: [
      "Is UniDeals free to use?",
      "What is included in the free plan?",
      "What is the Pro plan?",
      "What does Pro+ include?",
      "How much is the Founder's lifetime offer?",
      "Do I pay any commission or hidden fee?",
      "What is a listing boost?",
      "How many boosts do I get per month?",
      "Can I buy additional boosts?",
      "How long does a boost last?",
      "What happens when I run out of boost credits?",
      "Is there a yearly renewal?",
      "Which plan is better for sellers?",
      "How do I upgrade my account?",
      "What is search priority?",
      "Can I upgrade from free to Pro?"
    ],
    answer: "UniDeals has a free plan and paid lifetime plans. The free plan includes up to 10 active listings, 25 wishlist saves, and standard search visibility. Pro (₹99 lifetime) unlocks 25 active listings, 2 monthly boosts, 100 wishlist saves, and higher search priority. Pro+ (₹199 lifetime) unlocks unlimited listings, 5 monthly boosts, unlimited wishlist, and the highest visibility in campus search. Boost add-ons for 3-day and 7-day listing promotion are also available. There are no commissions on transactions and no recurring monthly charges for the lifetime founder plans, though pricing is limited to the launch offer period."
  },
  selling: {
    title: "Selling, listing, and product upload",
    keywords: [
      "sell", "selling", "list item", "list product", "upload", "post product", "add product", "create listing", "publish listing",
      "how to sell", "how do i list", "upload photos", "set price", "condition", "brand new", "like new", "gently used", "original price",
      "campus pickup", "pickup location", "hosting price", "selling price", "negotiable", "where to upload", "how to post", "create ad",
      "how to publish a product", "why is my listing not live", "list an item", "how many photos", "what can i sell", "can i sell used books"
    ],
    questions: [
      "How do I sell an item?",
      "Where do I click to upload a product?",
      "What details are needed to list an item?",
      "How many photos can I upload?",
      "Can I upload more than 3 pictures?",
      "What should I write in the description?",
      "Can I sell my books, course notes, or study material?",
      "Can I sell electronics, bikes, or hostel essentials?",
      "Can I list a price that is above the original MRP?",
      "Can I mark the price as negotiable?",
      "What is a good pickup address?",
      "Should I include my room number?",
      "How do I know my listing is active?",
      "How long does a listing stay live?",
      "What if my item is damaged or has wear?",
      "Can I re-list a sold item?"
    ],
    answer: "To sell successfully, go to the Sell/Upload flow, choose a product category, add a clear title, accurate description, and condition, upload real photos of the actual item, and set a fair price. Your price should not exceed the original MRP or purchase price. Include a campus pickup location that is safe and easy to find (library gate, student center, canteen, hostel gate). Be transparent about wear, scratches, battery health, missing parts, and any flaws. Once reviewed and published, the listing becomes visible to campus buyers. Keep your listing updated and remove or mark it as sold when the deal is complete."
  },
  buying: {
    title: "Buying, search, chat, and verification",
    keywords: [
      "buy", "purchase", "search", "find product", "category", "filter", "browse", "chat with seller", "message seller", "meet seller",
      "negotiation", "price negotiation", "fair price", "inspection", "what to check before buying", "product details", "product page",
      "where to buy", "how to find a deal", "how do i contact seller", "how do i inspect", "is this price fair", "need to buy"
    ],
    questions: [
      "How do I search for a product?",
      "How do I contact a seller?",
      "What should I ask a seller before buying?",
      "How do I check if a price is fair?",
      "Is it safe to pay in advance?",
      "What should I inspect before paying?",
      "Can I negotiate the price?",
      "Where should we meet?",
      "What if the seller insists on a private location?",
      "Can I ask for more photos or a video?",
      "What is the best campus meetup place?",
      "How do I verify the item is real?",
      "Can I buy without creating an account?",
      "Can I ask the AI assistant for pricing advice?"
    ],
    answer: "Buyers can search by keyword, category, or filtering by price and condition. Product pages show photos, description, condition, pickup area, selling price, and other key details. Before buying, check the listing carefully, ask about the item's condition, original purchase date, working status, and any defects. Use in-app chat to negotiate and confirm the meetup spot. Meet in a public, well-lit campus location, inspect the item in person, and only pay after verifying that it works and matches the listing. Never pay advance money before inspection."
  },
  safety: {
    title: "Safety, scams, meetups, and reporting",
    keywords: [
      "safety", "safe", "scam", "fraud", "report", "flag", "fake item", "fake user", "harassment", "unsafe", "advance payment",
      "safe to pay", "is it safe", "pay in advance", "paying advance", "token amount", "upi scam", "qr code", "cash payment",
      "other than app", "private location", "public campus location", "meetup safety", "seller asks for payment first",
      "what if seller asks for payment first", "what if buyer is suspicious", "how to avoid scams", "how to report buyer",
      "bank transfer", "cash only", "online payment", "verify product", "suspicious listing", "blocked account", "emergency support"
    ],
    questions: [
      "How do I avoid scams?",
      "Is paying a token amount safe?",
      "What are common scam signs?",
      "Should I pay before inspecting the item?",
      "Can I meet in a hostel room or private place?",
      "What if the buyer asks me to pay via a link or QR code?",
      "How do I report a suspicious user or listing?",
      "How do I flag a fake product?",
      "What should I do if a seller misleads me?",
      "How quickly does the team review reports?",
      "What if there is harassment or threatening behavior?",
      "Are there ways to block a user?",
      "What should I do in an emergency?"
    ],
    answer: "Safety is a core rule on UniDeals. Never pay before meeting and inspecting the item. Always meet in a public, well-lit campus location. Avoid private rooms, off-platform payment methods, suspicious QR codes, advance payment requests, or pressure to hurry. If something feels off, stop the exchange, report the user or listing, and contact support. For emergencies or threats, contact campus security or local authorities first. Flagging a suspicious listing helps the moderation team review it and remove fraud or unsafe activity quickly."
  },
  boosts: {
    title: "Boosting listings and visibility",
    keywords: [
      "boost", "boosting", "promote", "featured", "highlight", "top of search", "visibility", "views", "popular", "search priority",
      "how to boost", "my listing is not getting views", "promote my product", "boost credits", "increase sales", "more views",
      "use monthly boosts", "3 day boost", "7 day boost", "why is my product not boosted", "top search", "featured listing"
    ],
    questions: [
      "How do I boost a listing?",
      "What does a boost do?",
      "How long does a boost last?",
      "Does a boost guarantee a sale?",
      "Can I use boost credits if I am on free plan?",
      "How many boosts do I get with Pro?",
      "What is the difference between 3-day and 7-day boosts?",
      "Do boosted items appear higher in search?",
      "Can I buy a boost addon without upgrading?",
      "Why is my item not boosted?",
      "How do I know if my product is boosted?"
    ],
    answer: "Boosting increases a listing's visibility in campus searches and helps more buyers discover it faster. Boosts can be used from the listing management area if the product is active and eligible. Pro users get monthly boost credits; Pro+ users get more. Additional 3-day and 7-day boosts can also be purchased. A boost is not a guarantee of sale, but it significantly increases placement and attention. Once the boost ends, the listing returns to normal visibility unless more boosts are added."
  },
  profile: {
    title: "Profile, settings, address, and account preferences",
    keywords: [
      "profile", "settings", "avatar", "profile photo", "name", "mobile number", "gender", "address", "default address",
      "campus address", "pickup address", "hostel block", "room number", "pincode", "city", "edit profile", "save changes",
      "change phone", "change email", "update address", "add address", "remove address", "set default pickup location"
    ],
    questions: [
      "How do I edit my profile?",
      "How do I change my profile photo?",
      "How do I update my name or phone number?",
      "How do I add or edit my pickup address?",
      "What is a good campus pickup address?",
      "How do I set a default address?",
      "Can I remove an outdated address?",
      "Can I change my hostel or city details?",
      "Where do I find my account settings?"
    ],
    answer: "Profile and Settings let you maintain your personal details, avatar, verification information, and safe campus pickup address. Choose an easy-to-find public location, such as the library gate, canteen, hostel security, or student center. Keep your details current so buyers or sellers know how and where to meet. Safe, public pickup addresses reduce confusion and help prevent fraud."
  },
  support: {
    title: "Support, contact, complaints, and escalations",
    keywords: [
      "support", "help", "contact", "assistant", "email support", "support@campusmart.in", "report issue", "bug", "problem",
      "can't log in", "technical issue", "complaint", "dispute", "chat bug", "payment issue", "feature request", "ask for help",
      "issue with listing", "seller not responding", "buyer not showing up", "need help with account"
    ],
    questions: [
      "How do I contact support?",
      "What information should I include in a support message?",
      "Who can help with a scam report?",
      "What if a buyer never shows up to meet?",
      "What if a listing has a wrong photo or fake details?",
      "How do I report a bug?",
      "Can I contact support by email?",
      "What if I need help with my account?",
      "What if I feel threatened or unsafe?"
    ],
    answer: "Use the Contact or Support section to report issues, ask for help, or escalate a problem. Include relevant details such as the product link, user name, screenshot, message history, date of the incident, and the reason for the report. For urgent safety issues, contact campus security or local authorities immediately. Support can also help with account problems, fake listings, platform bugs, and suspicious user reports."
  },
  ai: {
    title: "AI assistant and how to use the platform features",
    keywords: [
      "ai", "assistant", "chatbot", "bot", "ask ai", "gemini", "price estimate", "fair price", "listing draft", "product ideas",
      "what can you do", "how to use ai", "can you help me write a listing", "find a product", "compare products", "budget bundle",
      "inspection checklist", "tips for buying", "assistant help", "Ai tool", "ai support"
    ],
    questions: [
      "What can the AI assistant do?",
      "Can the AI help me write a listing?",
      "Can the AI estimate a fair price?",
      "Can I ask the AI for product recommendations?",
      "Can the AI help me compare two products?",
      "Can the AI suggest a budget bundle?",
      "Can the AI tell me what to check before buying a laptop?",
      "How do I open the AI assistant?",
      "Can I ask in Hinglish or English?"
    ],
    answer: "The UniDeals AI assistant helps with product discovery, fair price estimation, listing drafts, budget planning, safety guidance, and product inspection advice. You can ask in English or Hinglish. It can help create a polished product title and description, compare options, suggest a budget-friendly bundle, and check whether an item price looks fair based on category and condition. Use it to shortlist deals and reduce the risk of buying a poor-quality item."
  }
};

const FAQ_PRIORITY = [
  "terms", "privacy", "subscription", "selling", "buying", "safety", "boosts", "profile", "support", "ai"
];

export const getKnowledgeSnippet = (query) => {
  const q = query.toLowerCase();

  for (const sectionId of FAQ_PRIORITY) {
    const section = FAQ_SECTION_LIBRARY[sectionId];
    if (!section) continue;

    const match = section.keywords.some((keyword) => new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(q))
      || section.questions.some((question) => new RegExp(question.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+"), "i").test(q));

    if (match) {
      return {
        type: sectionId,
        title: section.title,
        data: {
          title: section.title,
          answer: section.answer,
          questions: section.questions,
          keywords: section.keywords
        }
      };
    }
  }

  if (/\b(term|terms|condition|conditions|policy|policies|rule|rules|legal|prohibited|ban|illegal|age|eligibility|liability|refund|escrow|code of conduct)\b/i.test(q)) {
    return {
      type: "terms",
      data: FAQ_SECTION_LIBRARY.terms
    };
  }

  if (/\b(safe|safety|scam|fraud|report|flag|harassment|advance payment|pay in advance|paying advance|token amount|fake item|fake user|qr code|meetup safety|unsafe)\b/i.test(q)) {
    return {
      type: "safety",
      data: FAQ_SECTION_LIBRARY.safety
    };
  }

  if (/\b(subscription|plan|plans|pricing|cost|fee|pro|pro\+|free|boost|founder|tier|upgrade|membership|benefits)\b/i.test(q)) {
    return {
      type: "subscription",
      data: FAQ_SECTION_LIBRARY.subscription
    };
  }

  if (/\b(sell|list|upload|post|create listing|put item|add product|how to sell|publish|listing)\b/i.test(q)) {
    return { type: "selling", data: FAQ_SECTION_LIBRARY.selling };
  }

  if (/\b(buy|purchase|contact|chat with seller|meet seller|how to order|how to buy|search|browse|find product|fair price|comparison)\b/i.test(q)) {
    return { type: "buying", data: FAQ_SECTION_LIBRARY.buying };
  }

  if (/\b(profile|setting|settings|avatar|address|pickup|change name|update phone|edit profile)\b/i.test(q)) {
    return { type: "profile", data: FAQ_SECTION_LIBRARY.profile };
  }

  if (/\b(report|scam|flag|fake|cheat|fraud|block|safety|harassment|privacy|delete account|support)\b/i.test(q)) {
    return { type: "support", data: FAQ_SECTION_LIBRARY.support };
  }

  for (const guide of STEP_BY_STEP_GUIDES) {
    if (guide.topic === "how_to_sell" && /\b(sell|list|upload|post|create listing|put item|add product|how to sell)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_buy" && /\b(buy|purchase|contact|chat with seller|meet seller|how to order|how to buy|search|find deal|price)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_boost" && /\b(boost|promote|increase view|featured|highlight|how to boost|top search)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_upgrade" && /\b(upgrade|buy pro|get pro\+|membership|how to upgrade|lifetime plan|founder offer)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_wishlist" && /\b(wishlist|save|favorite|bookmark|how to save|heart)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_profile_settings" && /\b(profile|setting|settings|avatar|address|change name|update phone|how to edit|campus address)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_report_safety" && /\b(report|scam|flag|fake|cheat|fraud|block|safety|harassment|how to report)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
    if (guide.topic === "how_to_use_ai" && /\b(ai|chatbot|assistant|bot|features|what can you do|how to use|fair price|listing draft)\b/i.test(q)) {
      return { type: "guide", data: guide };
    }
  }

  return null;
};