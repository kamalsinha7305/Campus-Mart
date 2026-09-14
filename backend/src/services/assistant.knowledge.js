const normalize = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const splitTerms = (value = "") => normalize(value).split(" ").filter(Boolean);

const makeEntry = ({
  id,
  title,
  keywords,
  answer,
  steps = [],
  route = null,
  source = "UniDeals knowledge base",
  suggestions = [],
}) => ({
  id,
  title,
  keywords: keywords.map(normalize),
  answer,
  steps,
  route,
  source,
  suggestions,
});

export const ASSISTANT_KNOWLEDGE_BASE = [
  makeEntry({
    id: "terms_overview",
    title: "Terms and Conditions",
    keywords: [
      "terms",
      "terms and conditions",
      "rules",
      "conditions",
      "legal",
      "what are the rules",
      "everything about terms",
    ],
    answer:
      "UniDeals is a student marketplace, not a party to buyer-seller transactions. Users must be 18+, enrolled at a recognised Indian college/university, use one verified account, post honest listings, meet safely on campus, and avoid prohibited items or fraud.",
    steps: [
      "Use only one verified student account.",
      "Post accurate product details, photos, prices, and pickup information.",
      "Meet buyers or sellers in safe public campus locations.",
      "Do not sell illegal goods, counterfeit items, weapons, drugs, alcohol, prescription medicines, or items you do not own.",
      "Do not harass users, create fake reviews, misrepresent products, scrape the platform, or move unsafe transactions off-platform.",
      "Report suspicious users or listings from the report/flag option.",
      "Understand that UniDeals may remove listings or suspend accounts for fraud, unsafe activity, or terms violations.",
    ],
    route: "/termscondition",
    suggestions: [
      "What items are prohibited?",
      "How do I report a scam?",
      "How do I sell something?",
    ],
  }),
  makeEntry({
    id: "privacy_overview",
    title: "Privacy Policy",
    keywords: ["privacy", "data", "personal data", "cookies", "messages stored", "delete my data"],
    answer:
      "UniDeals collects account, verification, listing, usage, and message data to run the marketplace, verify students, support chats, prevent fraud, and improve the platform. It does not sell or trade personal data.",
    steps: [
      "Account data can include name, university email, profile photo, campus, and optional mobile number.",
      "Verification data is used to confirm student status and is not shared with third parties.",
      "Listing and chat data may be stored for marketplace operation and safety investigations.",
      "Deletion requests are fulfilled within 30 days unless law requires longer retention.",
      "For privacy requests, contact privacy@campusmart.in.",
    ],
    route: "/privacy-policy",
    suggestions: ["What data does UniDeals collect?", "How do I delete my account?", "Are chats stored?"],
  }),
  makeEntry({
    id: "sell_upload_steps",
    title: "How to Sell or Upload a Product",
    keywords: ["sell", "upload", "post product", "list product", "create listing", "add product"],
    answer:
      "To sell on UniDeals, create a clear listing with honest details, 1-3 photos, fair pricing, and a safe campus pickup address.",
    steps: [
      "Go to Upload from the menu.",
      "Fill product details: title, category, condition, description, usage duration, and purchase date if available.",
      "Add the original price and selling price. Keep the selling price less than or equal to the original price.",
      "Choose whether the price is negotiable.",
      "Upload 1-3 clear photos of the real item.",
      "Select or add a safe campus pickup address.",
      "Accept Terms & Conditions and Privacy Policy.",
      "Preview the listing, then publish it.",
    ],
    route: "/upload",
    suggestions: ["Help me write a listing", "Estimate a fair price", "What photos should I upload?"],
  }),
  makeEntry({
    id: "buy_steps",
    title: "How to Buy a Product",
    keywords: ["buy", "purchase", "how to buy", "contact seller", "message seller", "order"],
    answer:
      "To buy on UniDeals, search for a product, inspect the listing, chat with the seller, meet safely on campus, and pay only after checking the item.",
    steps: [
      "Browse Home, Search, or a Category page.",
      "Open a product card to view photos, price, condition, seller details, and pickup area.",
      "Use Chat/Message Seller to ask questions or negotiate.",
      "Agree on a public campus meetup spot and time.",
      "Inspect the item before paying.",
      "Pay only at the time of exchange, preferably after confirming the product works.",
    ],
    route: "/search",
    suggestions: ["What should I inspect before buying?", "Is advance payment safe?", "Find electronics under 5000"],
  }),
  makeEntry({
    id: "wishlist_steps",
    title: "Wishlist",
    keywords: ["wishlist", "save product", "heart", "saved items", "favorite", "favourite"],
    answer:
      "Wishlist lets you save products you are interested in so you can quickly come back to them later.",
    steps: [
      "Open any product card or product detail page.",
      "Click the heart/wishlist button.",
      "Go to Wishlist from your profile/sidebar to see saved items.",
      "Click the heart again if you want to remove an item.",
    ],
    route: "/wishlist",
    suggestions: ["How do I buy a saved item?", "How do I remove wishlist items?", "Show trending items"],
  }),
  makeEntry({
    id: "profile_settings_steps",
    title: "Profile and Settings",
    keywords: ["profile", "settings", "edit profile", "avatar", "photo", "name", "account"],
    answer:
      "Profile and Settings are where you manage your account details, avatar, addresses, and security information.",
    steps: [
      "Go to Profile to view your account overview.",
      "Go to Settings to update personal details or profile photo.",
      "Use the address section to add, edit, delete, or set a default pickup address.",
      "Use security settings for password-related actions.",
    ],
    route: "/settings",
    suggestions: ["How do I add an address?", "How do I change my profile photo?", "How do I delete my data?"],
  }),
  makeEntry({
    id: "address_steps",
    title: "Address Management",
    keywords: ["address", "pickup address", "default address", "location", "campus pickup"],
    answer:
      "Addresses are used for pickup details when selling. For safety, choose a public place inside campus instead of a private home address.",
    steps: [
      "Open Settings or the address section during product upload.",
      "Add your address or campus pickup point.",
      "Keep the pickup location public and easy to identify.",
      "Set one address as default if you use it often.",
      "Edit or delete outdated addresses when needed.",
    ],
    route: "/settings",
    suggestions: ["How do I sell something?", "What is a safe meetup place?", "How many photos should I upload?"],
  }),
  makeEntry({
    id: "boosting_steps",
    title: "Boosting Products",
    keywords: ["boost", "boosting", "visibility", "promote", "sell faster", "subscription", "plan"],
    answer:
      "Boosting increases a listed product's visibility so more buyers can notice it. Boost availability and limits depend on your current subscription plan.",
    steps: [
      "Go to My Orders or your listed products.",
      "Choose an active listed product.",
      "Click Boost if the product is eligible and not already boosted.",
      "The boosted product gets higher visibility until the boost expires.",
      "If you hit a monthly or active boost limit, upgrade your plan or wait for the limit to reset.",
    ],
    route: "/myorders",
    suggestions: ["Which plan should I choose?", "How do I list a product?", "Why can't I boost my product?"],
  }),
  makeEntry({
    id: "report_safety_steps",
    title: "Report and Safety",
    keywords: ["report", "scam", "fraud", "unsafe", "fake", "complaint", "support", "harassment"],
    answer:
      "If something looks unsafe or fraudulent, do not continue the deal. Report the listing or user and contact campus security/local authorities first for emergencies.",
    steps: [
      "Stop the transaction if the user asks for advance payment, refuses campus meetup, or shares suspicious links/QR codes.",
      "Use the report/flag option on the product or user profile.",
      "Add clear details and evidence if available.",
      "Keep communication in-app where possible.",
      "For threats, theft, or immediate danger, contact campus security or local authorities first.",
    ],
    route: "/contact",
    suggestions: ["Is advance UPI payment safe?", "What are common scam signs?", "How do I inspect an item?"],
  }),
  makeEntry({
    id: "chat_steps",
    title: "Chat and Messages",
    keywords: ["chat", "messages", "message", "conversation", "seller chat", "buyer chat"],
    answer:
      "Chat is used to ask product questions, negotiate, confirm pickup details, and keep a record of the buyer-seller conversation.",
    steps: [
      "Open a product detail page.",
      "Click Message Seller or Chat.",
      "Ask about condition, availability, final price, and pickup time.",
      "Avoid sharing unnecessary private information.",
      "Keep important deal details in the chat for safety.",
    ],
    route: "/chat",
    suggestions: ["How do I buy safely?", "What should I ask a seller?", "Help me negotiate"],
  }),
  makeEntry({
    id: "account_auth_steps",
    title: "Account, Login, and Signup",
    keywords: ["signup", "sign up", "login", "log in", "verify email", "forgot password", "reset password", "account"],
    answer:
      "You can browse public listings as a guest, but verified student login is needed for protected actions like listing products, wishlist, chat, profile, and account features.",
    steps: [
      "Go to Signup to create an account.",
      "Use your valid student/university email when required.",
      "Verify your email if the app asks for verification.",
      "Use Login for returning users.",
      "Use Forgot Password if you cannot access your account.",
    ],
    route: "/signup",
    suggestions: ["Why do I need verification?", "How do I reset password?", "How do I sell after signup?"],
  }),
  makeEntry({
    id: "search_browse_steps",
    title: "Search and Browse",
    keywords: ["search", "browse", "category", "categories", "filter", "find product", "home page"],
    answer:
      "Search and category pages help buyers find active campus listings by keyword, product type, and price.",
    steps: [
      "Start from Home, Search, or a Category page.",
      "Type the product name or keyword you want.",
      "Use category pages for focused browsing like electronics, vehicles, study material, or hostel essentials.",
      "Open a product card to check full details before messaging the seller.",
      "If you cannot find a match, try a simpler keyword or ask the assistant for recommendations.",
    ],
    route: "/search",
    suggestions: ["Find a cycle under 3000", "Show electronics", "How do I contact a seller?"],
  }),
  makeEntry({
    id: "product_details_steps",
    title: "Product Details",
    keywords: ["product page", "product details", "details page", "view product", "seller details", "product card"],
    answer:
      "The product details page shows the important buying information: photos, title, price, condition, seller, pickup area, and action buttons like wishlist or chat.",
    steps: [
      "Open any product card from Home, Search, Category, Wishlist, or boosted listings.",
      "Review photos, description, condition, original price, selling price, and negotiability.",
      "Check seller information and pickup location.",
      "Use Wishlist to save it or Chat to contact the seller.",
      "Ask inspection and safety questions before confirming a meetup.",
    ],
    route: "/product/:id",
    suggestions: ["What should I ask a seller?", "How do I wishlist a product?", "How do I buy safely?"],
  }),
  makeEntry({
    id: "manage_listings_steps",
    title: "Manage Listed Products",
    keywords: ["my orders", "listed products", "my listings", "manage product", "relist", "delete listing", "sold"],
    answer:
      "Your listed products are managed from the seller/listings area, where you can review active items and use actions like boost when eligible.",
    steps: [
      "Go to My Orders or your listed-products area.",
      "Find the product you want to manage.",
      "Open the available action buttons for that listing.",
      "Boost only active listed products that are eligible under your plan.",
      "Keep unavailable, sold, or outdated listings updated so buyers are not misled.",
    ],
    route: "/myorders",
    suggestions: ["How does boosting work?", "How do I sell something?", "Why can't I boost?"],
  }),
  makeEntry({
    id: "pricing_subscription_steps",
    title: "Pricing Plans and Subscription",
    keywords: ["pricing", "price page", "subscription", "plan", "upgrade", "pro", "pro plus", "membership"],
    answer:
      "Pricing and subscription pages explain plan benefits such as selling tools, visibility, and boost-related limits. Exact availability depends on the plan rules configured in the app.",
    steps: [
      "Open the Pricing page to compare public plan options.",
      "Open Subscription from your profile area to see your current plan.",
      "Choose a plan based on how actively you sell.",
      "Use boost features only within your plan's monthly and active boost limits.",
    ],
    route: "/price",
    suggestions: ["How does boosting work?", "Which plan is best for sellers?", "How do I check my current plan?"],
  }),
  makeEntry({
    id: "notifications_steps",
    title: "Notifications",
    keywords: ["notification", "notifications", "alerts", "updates", "message alert", "price alert"],
    answer:
      "Notifications keep you updated about marketplace activity such as messages, product actions, price alerts, and account-related updates.",
    steps: [
      "Open Notifications from the menu.",
      "Review the latest alerts and marketplace updates.",
      "Open the linked action if a notification points to chat, product, or account activity.",
      "Check notifications regularly when you are buying or selling actively.",
    ],
    route: "/notification",
    suggestions: ["How do I open chat?", "How do I manage listings?", "How do I contact support?"],
  }),
  makeEntry({
    id: "contact_support_steps",
    title: "Contact Support",
    keywords: ["contact", "support", "help center", "ticket", "problem", "issue", "bug"],
    answer:
      "Use Contact/Support when you need help with account issues, reports, bugs, suspicious activity, or platform questions that the assistant cannot solve.",
    steps: [
      "Go to Contact from the menu or profile area.",
      "Describe the issue clearly.",
      "Include product/user details and screenshots if relevant.",
      "For immediate danger or crime, contact campus security or local authorities first.",
    ],
    route: "/contact",
    suggestions: ["How do I report a scam?", "What details should I include?", "How do I stay safe?"],
  }),

  // ════════════════════════════════════════════════════════
  //  PLATFORM BASICS
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "what_is_unideals",
    title: "What is UniDeals?",
    keywords: [
      "what is unideals", "what is this", "about unideals", "unideals kya hai",
      "ye kya hai", "tell me about", "what is campus mart", "what is this app",
      "what is this website", "what does unideals do", "kya karta hai",
      "introduce yourself", "platform kya hai", "marketplace kya hai",
      "about this platform", "about campus mart", "what is this site",
    ],
    answer:
      "UniDeals (Campus-Mart) is a peer-to-peer campus marketplace built exclusively for verified Indian college students. It lets you buy, sell, and exchange pre-owned items like electronics, cycles, books, hostel essentials, and more — safely within your own college community. Think of it as OLX, but only for your campus, with student verification, AI-powered price estimates, smart listing tools, and in-app chat for safe negotiations.",
    steps: [
      "Students sign up and verify their college email to join.",
      "Sellers upload listings with photos, price, condition, and a campus pickup location.",
      "Buyers browse, search, or ask the AI assistant to find deals.",
      "Buyer and seller negotiate via in-app chat.",
      "They meet at a safe public campus spot, inspect the item, and exchange payment (UPI/cash).",
      "UniDeals never handles money — all transactions happen directly between students.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sign up?", "Is UniDeals free?", "How do I sell something?"],
  }),

  makeEntry({
    id: "who_can_use",
    title: "Who Can Use UniDeals?",
    keywords: [
      "who can use", "eligibility", "eligible", "college student", "university",
      "age limit", "age requirement", "koun use kar sakta", "student only",
      "non student", "alumni", "faculty", "teacher", "staff", "school student",
      "18 years", "minor", "underage", "verified student", "student verification",
      "which college", "recognized college", "indian college",
    ],
    answer:
      "UniDeals is exclusively for students aged 18 or older who are currently enrolled at a recognized Indian college or university. You must verify your student email (e.g., @college.edu or @domain.ac.in) to access selling, buying, chat, and other protected features. Alumni, faculty, school students, and non-students cannot use the marketplace. One account per person — duplicate or fake accounts are permanently banned.",
    steps: [
      "You must be at least 18 years old.",
      "You must be an active student at a recognized Indian college or university.",
      "Verify your student/university email during signup.",
      "Only one account per person is allowed — duplicates result in permanent suspension.",
      "Guest browsing of public listings is allowed without an account.",
    ],
    route: "/signup",
    source: "UniDeals knowledge base",
    suggestions: ["How do I verify my email?", "Can alumni use UniDeals?", "How do I sign up?"],
  }),

  makeEntry({
    id: "is_it_free",
    title: "Is UniDeals Free?",
    keywords: [
      "is it free", "free hai kya", "cost", "charge", "paisa lagta hai",
      "fees", "kharcha", "subscription zaruri", "do i need to pay",
      "free to use", "hidden charges", "commission", "platform fee",
      "koi charge hai", "free account", "paid", "kitna paisa",
    ],
    answer:
      "Yes, UniDeals is completely free to use! You can sign up, browse listings, search products, save to wishlist, chat with sellers, and buy items — all at zero cost. The Free plan allows up to 10 active listings and 25 wishlist saves. For power sellers who want more visibility and features, optional paid plans (Pro at ₹99 lifetime, Pro+ at ₹199 lifetime) unlock unlimited listings, monthly boosts, and priority search placement. UniDeals never charges commission on any transaction.",
    steps: [
      "Sign up for free with your college email.",
      "Free plan includes: 10 active listings, 25 wishlist saves, standard search visibility.",
      "Pro plan (₹99 lifetime): 25 active listings, 2 monthly boosts, 100 wishlist saves, high search priority.",
      "Pro+ plan (₹199 lifetime): Unlimited listings, 5 monthly boosts, unlimited wishlist, highest search priority, 24/7 support.",
      "No commission or hidden fees on any transaction — ever.",
    ],
    route: "/price",
    source: "UniDeals knowledge base",
    suggestions: ["What does Pro give me?", "How do I upgrade?", "What are boost add-ons?"],
  }),

  makeEntry({
    id: "how_it_works",
    title: "How Does UniDeals Work?",
    keywords: [
      "how does it work", "how it works", "kaise kaam karta", "kaise use kare",
      "explain the process", "buying selling process", "step by step",
      "process kya hai", "flow", "how to use unideals", "getting started",
      "start kaise kare", "shuru kaise kare", "guide me", "walk me through",
      "how does buying work", "how does selling work", "samjhao",
    ],
    answer:
      "UniDeals works in 6 simple steps: Sign up → List or Browse → Chat → Meet on Campus → Inspect → Pay & Exchange. Sellers create listings with photos and pricing; buyers find items via search, categories, or the AI assistant. All negotiations happen through in-app chat. Meetups must be at public campus locations. Payment (UPI or cash) happens only after the buyer inspects the item in person. UniDeals never handles money or shipping — it's a direct peer-to-peer exchange.",
    steps: [
      "Step 1: Sign up with your college email and verify your account.",
      "Step 2 (Sellers): Go to Upload, add product details, photos, price, and pickup address. Publish your listing.",
      "Step 2 (Buyers): Browse Home, use Search, explore Categories, or ask the AI assistant to find deals.",
      "Step 3: Use in-app Chat to ask questions, negotiate price, and confirm details.",
      "Step 4: Agree on a public campus meetup spot and time (Library Gate, Canteen, Student Center).",
      "Step 5: Meet in person. Buyer inspects the item thoroughly before paying.",
      "Step 6: Pay via UPI (GPay/PhonePe/Paytm) or cash ONLY after confirming the product works.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sell something?", "How do I buy?", "Is it safe?"],
  }),

  makeEntry({
    id: "campus_coverage",
    title: "Which Colleges Does UniDeals Cover?",
    keywords: [
      "which college", "campus coverage", "my college", "available at",
      "supported college", "kaunsa college", "mere college mein", "city",
      "college list", "university list", "all india", "pan india",
      "is my college", "does it work at", "available in",
    ],
    answer:
      "UniDeals is designed for all recognized Indian colleges and universities. As long as you have a valid student email from a recognized institution, you can join UniDeals. The marketplace works best when multiple students from the same campus join, so invite your friends and hostel-mates to build your campus community! The more students on your campus, the more deals you'll find.",
    steps: [
      "Any recognized Indian college or university student can join.",
      "You need a valid student email (@college.edu, @domain.ac.in) to verify.",
      "The platform becomes more useful as more students from your campus join.",
      "Share UniDeals with hostel-mates and classmates to grow your campus marketplace.",
    ],
    route: "/signup",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sign up?", "How do I invite friends?", "Is it free?"],
  }),

  // ════════════════════════════════════════════════════════
  //  ACCOUNT & AUTHENTICATION
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "forgot_password",
    title: "Forgot Password / Reset Password",
    keywords: [
      "forgot password", "reset password", "password bhool gaya", "can't login",
      "login nahi ho raha", "change password", "new password", "password reset",
      "password change", "lost password", "mera password", "pwd reset",
      "account access", "locked out", "sign in problem", "login issue",
      "unable to login", "password nahi pata", "password yaad nahi",
    ],
    answer:
      "If you've forgotten your password, use the 'Forgot Password' link on the login page. You'll receive a password reset email at your registered email address. Click the reset link in the email (valid for a limited time), set a new password, and log back in. If you signed up with Google OAuth, you don't have a separate UniDeals password — just click 'Sign in with Google'.",
    steps: [
      "Go to the Login page.",
      "Click 'Forgot Password' below the login form.",
      "Enter your registered email address.",
      "Check your inbox (and spam folder) for the reset email.",
      "Click the password reset link in the email.",
      "Set a new strong password and confirm it.",
      "Log in with your new password.",
      "If you used Google Sign-In, click 'Sign in with Google' instead.",
    ],
    route: "/login",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sign up?", "How do I sign in with Google?", "How do I contact support?"],
  }),

  makeEntry({
    id: "delete_account",
    title: "Delete Account / Remove Data",
    keywords: [
      "delete account", "remove account", "account delete", "account hatao",
      "data delete", "erase data", "remove my data", "mera account band karo",
      "close account", "deactivate", "account delete kaise kare",
      "privacy delete", "mera data hatao", "gdpr", "data removal",
    ],
    answer:
      "To delete your UniDeals account and associated data, contact support at privacy@campusmart.in with your registered email and a deletion request. Your account, listings, chat history, and personal data will be permanently removed within 30 days, unless Indian law requires longer retention for specific records. This action is irreversible — all your listings, wishlist, and chat history will be lost.",
    steps: [
      "Send an email to privacy@campusmart.in from your registered email.",
      "Subject line: 'Account Deletion Request'.",
      "Include your registered email address and reason (optional).",
      "Your data will be deleted within 30 days.",
      "You will receive a confirmation email once deletion is complete.",
      "Note: This is permanent — listings, chats, and wishlist cannot be recovered.",
    ],
    route: "/settings",
    source: "UniDeals knowledge base",
    suggestions: ["What data does UniDeals collect?", "How do I change my password?", "How do I contact support?"],
  }),

  makeEntry({
    id: "google_login",
    title: "Google Sign-In / OAuth Login",
    keywords: [
      "google login", "sign in with google", "google se login", "oauth",
      "google account", "gmail login", "google sign up", "google se signup",
      "social login", "one click login", "google button",
    ],
    answer:
      "UniDeals supports Google OAuth2 for quick and secure sign-in. Click the 'Sign in with Google' button on the login or signup page, select your Google account, and you're in! No separate password needed. Your Google profile name and email are used to create your UniDeals account. You can update your display name and other details later in Settings.",
    steps: [
      "Go to the Login or Signup page.",
      "Click the 'Sign in with Google' button.",
      "Select your Google account from the popup.",
      "Your UniDeals account is created automatically.",
      "Update your profile details in Settings if needed.",
    ],
    route: "/login",
    source: "UniDeals knowledge base",
    suggestions: ["How do I edit my profile?", "How do I verify my email?", "How do I sell something?"],
  }),

  makeEntry({
    id: "email_verification",
    title: "Email Verification",
    keywords: [
      "verify email", "email verification", "verification", "verify kaise kare",
      "email confirm", "verification link", "email nahi aaya", "otp",
      "verify account", "why verify", "verification required", "unverified",
      "resend verification", "verification email not received",
    ],
    answer:
      "Email verification confirms you're a real student at a recognized Indian college. After signing up, check your inbox for a verification email from UniDeals. Click the verification link to activate your account. Verified accounts can list products, wishlist items, chat with sellers, and access all features. Without verification, you can only browse public listings. If the email doesn't arrive, check your spam/junk folder or request a resend.",
    steps: [
      "Sign up with your student/university email.",
      "Check your inbox for the verification email from UniDeals.",
      "If not in inbox, check Spam/Junk folder.",
      "Click the verification link in the email.",
      "Your account is now verified — all features unlocked!",
      "If the link expired, request a new verification email from the login page.",
    ],
    route: "/signup",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sign up?", "I didn't receive the email", "What can I do without verification?"],
  }),

  makeEntry({
    id: "logout_steps",
    title: "How to Log Out",
    keywords: [
      "logout", "log out", "sign out", "signout", "logout kaise kare",
      "sign out kaise kare", "exit account", "account se bahar",
    ],
    answer:
      "To log out, click your profile avatar or menu icon in the top-right corner of the page, then select 'Logout' from the dropdown menu. You'll be signed out and redirected to the homepage. Your listings and data remain safe — you can log back in anytime.",
    steps: [
      "Click your profile avatar or the menu icon (top-right corner).",
      "Select 'Logout' from the dropdown menu.",
      "You'll be signed out and redirected to the homepage.",
      "Your listings and saved data are safe and will be available when you log back in.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["How do I change my password?", "How do I edit my profile?", "How do I delete my account?"],
  }),

  // ════════════════════════════════════════════════════════
  //  SELLING — ADVANCED
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "edit_listing",
    title: "Edit or Update a Listing",
    keywords: [
      "edit listing", "update listing", "change listing", "modify listing",
      "edit product", "listing edit kaise kare", "price change", "description change",
      "update my product", "change price", "edit my post", "modify my ad",
      "listing mein change", "product update",
    ],
    answer:
      "To edit an existing listing, go to your listed products from the My Orders/My Listings section. Find the product you want to update and click on it. You can update the title, description, price, condition, photos, and pickup address. Save the changes and your listing will be updated immediately for all buyers to see.",
    steps: [
      "Go to My Orders or My Listings from your profile menu.",
      "Find the product you want to edit.",
      "Click on the product to open the edit view.",
      "Update any details: title, description, price, condition, photos, or pickup address.",
      "Click 'Save Changes' to publish the update.",
      "Your updated listing is immediately visible to buyers.",
    ],
    route: "/myorders",
    source: "UniDeals knowledge base",
    suggestions: ["How do I delete a listing?", "How do I boost my listing?", "How do I set a fair price?"],
  }),

  makeEntry({
    id: "delete_listing",
    title: "Delete or Remove a Listing",
    keywords: [
      "delete listing", "remove listing", "listing hatao", "listing delete kaise",
      "remove my product", "take down listing", "delete my post", "product hatana hai",
      "sold item remove", "listing remove", "delist", "unpublish",
    ],
    answer:
      "To remove a listing, go to My Orders/My Listings, find the product, and use the delete or remove option. Deleting a listing permanently removes it from the marketplace. If the item is sold, update its status to 'Sold' instead of deleting so buyers know it's no longer available. Keep your listings updated to avoid misleading buyers.",
    steps: [
      "Go to My Orders or My Listings from your profile menu.",
      "Find the listing you want to remove.",
      "Click the delete/remove button for that listing.",
      "Confirm the deletion when prompted.",
      "If the item is sold, consider marking it as 'Sold' instead of deleting.",
      "Deleted listings cannot be recovered.",
    ],
    route: "/myorders",
    source: "UniDeals knowledge base",
    suggestions: ["How do I edit a listing?", "How do I mark as sold?", "How do I sell something?"],
  }),

  makeEntry({
    id: "listing_not_showing",
    title: "Why Is My Listing Not Showing?",
    keywords: [
      "listing not showing", "product not visible", "listing not appearing",
      "can't see my listing", "listing nahi dikh raha", "where is my listing",
      "my product disappeared", "listing hide", "not appearing in search",
      "listing pending", "moderation", "under review",
    ],
    answer:
      "If your listing isn't showing, it could be due to several reasons: (1) It may still be under moderation review, (2) It may have been flagged or removed for violating platform rules (prohibited items, misleading info), (3) Your selling price may exceed the original price, (4) You may have hit your listing limit (10 for Free, 25 for Pro), or (5) There may be a temporary technical issue. Check My Orders to see the status of your listing.",
    steps: [
      "Go to My Orders/My Listings to check your listing's status.",
      "If the listing is 'Under Review', wait for moderation to approve it.",
      "If the listing was removed, check your email for the reason.",
      "Make sure the selling price is not higher than the original price.",
      "Verify you haven't exceeded your plan's listing limit (Free: 10, Pro: 25, Pro+: Unlimited).",
      "Ensure your photos are clear and your description is accurate.",
      "If the issue persists, contact support via the Contact page.",
    ],
    route: "/myorders",
    source: "UniDeals knowledge base",
    suggestions: ["What items are prohibited?", "How do I edit my listing?", "How do I contact support?"],
  }),

  makeEntry({
    id: "what_photos",
    title: "What Photos Should I Upload?",
    keywords: [
      "what photos", "how many photos", "photo tips", "image tips",
      "kaunsi photo", "kitni photo", "photography tips", "listing photos",
      "product photos", "photo upload", "picture tips", "clear photos",
      "photo quality", "achhi photo kaise", "image size",
    ],
    answer:
      "Upload 1-3 clear, real photos of your actual item — no stock images or screenshots from the internet. Good photos dramatically increase buyer interest. Take photos in natural daylight, show the item from multiple angles (front, back, sides), and highlight any wear, damage, or accessories included. For electronics, show the screen turned on. For books, show the cover and spine condition.",
    steps: [
      "Take photos in good natural daylight — avoid dark or blurry images.",
      "Photo 1: Front/main view of the item.",
      "Photo 2: Back or alternate angle showing overall condition.",
      "Photo 3: Close-up of any wear, damage, or included accessories.",
      "For electronics: show the screen turned on to prove it works.",
      "For books: show the front cover, spine, and any highlighting inside.",
      "Use real photos only — stock images or internet photos are not allowed.",
      "Maximum 3 images per listing.",
    ],
    route: "/upload",
    source: "UniDeals knowledge base",
    suggestions: ["How do I sell something?", "How do I set a fair price?", "Help me write a listing"],
  }),

  makeEntry({
    id: "listing_duration",
    title: "How Long Does a Listing Stay Active?",
    keywords: [
      "how long listing", "listing duration", "listing expiry", "listing expire",
      "kitne din", "listing validity", "active period", "auto delete",
      "listing kab tak", "does listing expire", "permanent listing",
    ],
    answer:
      "Listings on UniDeals stay active until you manually remove them, mark them as sold, or they are removed by moderation. There is no automatic expiry. However, we recommend keeping your listings updated — if an item is sold or no longer available, remove or update it promptly so buyers aren't misled. Boosted listings have a timed visibility boost (3 or 7 days) but the listing itself stays active.",
    steps: [
      "Listings remain active indefinitely until you remove them.",
      "Mark items as 'Sold' when they are no longer available.",
      "Boost visibility is time-limited (3 or 7 days), but the listing stays active.",
      "Keep listings updated with current availability and pricing.",
      "Listings may be removed by moderation if they violate platform rules.",
    ],
    route: "/myorders",
    source: "UniDeals knowledge base",
    suggestions: ["How do I delete a listing?", "How do I boost a listing?", "How do I edit a listing?"],
  }),

  makeEntry({
    id: "listing_limits",
    title: "How Many Items Can I List?",
    keywords: [
      "how many listings", "listing limit", "max listings", "kitne product",
      "listing cap", "can i list more", "limit reached", "maximum products",
      "free listing limit", "pro listing limit",
    ],
    answer:
      "The number of active listings depends on your plan: Free plan allows up to 10 active listings, Pro plan allows 25, and Pro+ plan gives you unlimited listings. If you've reached your limit, you can either upgrade your plan or remove old/sold listings to make room for new ones.",
    steps: [
      "Free plan: Up to 10 active listings.",
      "Pro plan (₹99 lifetime): Up to 25 active listings.",
      "Pro+ plan (₹199 lifetime): Unlimited active listings.",
      "To list more, remove sold or outdated listings, or upgrade your plan.",
      "Check your current plan in the Subscription section of your profile.",
    ],
    route: "/price",
    source: "UniDeals knowledge base",
    suggestions: ["How do I upgrade to Pro?", "How do I delete a listing?", "What does Pro+ include?"],
  }),

  makeEntry({
    id: "prohibited_items",
    title: "What Items Are Prohibited?",
    keywords: [
      "prohibited items", "banned items", "not allowed", "what can i sell",
      "restricted items", "illegal items", "kya nahi bech sakte", "banned products",
      "prohibited list", "not permitted", "contraband", "restricted",
      "can i sell alcohol", "can i sell medicines", "can i sell weapons",
    ],
    answer:
      "UniDeals strictly prohibits: alcohol, drugs, tobacco, prescription medicines, weapons (knives, explosives, firearms), counterfeit/fake products, stolen goods, adult content, academic dishonesty materials (exam leaks, answer keys), and unauthorized bulk commercial reselling. Bait-and-switch pricing and misrepresenting product condition are also banned. Listings violating these rules are removed, and repeat offenders face permanent account suspension.",
    steps: [
      "Strictly banned: Alcohol, drugs, tobacco, prescription medicines.",
      "Strictly banned: Weapons, knives, explosives, firearms.",
      "Strictly banned: Counterfeit/fake products, stolen goods.",
      "Strictly banned: Adult/explicit content.",
      "Strictly banned: Exam leaks, answer keys, academic dishonesty materials.",
      "Strictly banned: Bulk commercial reselling (not personal student sales).",
      "Bait-and-switch pricing or fake condition descriptions lead to account suspension.",
      "Report prohibited listings using the flag/report button.",
    ],
    route: "/termscondition",
    source: "UniDeals knowledge base",
    suggestions: ["How do I report a listing?", "What are the terms?", "How do I sell safely?"],
  }),

  // ════════════════════════════════════════════════════════
  //  BUYING — ADVANCED
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "negotiation_tips",
    title: "How to Negotiate Price",
    keywords: [
      "negotiate", "negotiation", "bargain", "price kam karo", "discount",
      "bargaining tips", "how to negotiate", "mol bhav", "rate kam",
      "price negotiable", "offer price", "counter offer", "haggle",
      "price discuss", "is price final", "can i negotiate",
    ],
    answer:
      "Yes, many listings on UniDeals are marked as 'Negotiable'! To negotiate: open the product page, click 'Chat with Seller', and politely suggest a fair counter-offer. Research similar items on UniDeals first so your offer is reasonable. Be respectful — remember you're dealing with a fellow student. A good rule of thumb: offer 10-20% below asking price if the listing is negotiable. Never lowball aggressively — it discourages sellers.",
    steps: [
      "Check if the listing is marked as 'Negotiable' on the product page.",
      "Research similar items on UniDeals to understand fair pricing.",
      "Open in-app Chat with the seller.",
      "Politely suggest your offer with a reason (e.g., 'I found a similar one for ₹X').",
      "Be willing to meet in the middle — suggest a fair counter-offer.",
      "Agree on the final price before arranging a meetup.",
      "Never pay until you've inspected the item in person.",
    ],
    route: "/chat",
    source: "UniDeals knowledge base",
    suggestions: ["Estimate fair price for an item", "Safety tips for meetups", "How do I buy?"],
  }),

  makeEntry({
    id: "return_refund",
    title: "Returns and Refunds",
    keywords: [
      "return", "refund", "return policy", "money back", "paisa wapas",
      "defective item", "broken item", "not as described", "exchange",
      "can i return", "refund milega", "replacement", "item kharab nikla",
      "cheated", "wrong item", "scammed",
    ],
    answer:
      "UniDeals is a peer-to-peer marketplace — it does NOT handle returns, refunds, or exchanges. All transactions are directly between students. This is why we strongly recommend: (1) Always inspect the item thoroughly BEFORE paying, (2) Test electronics on the spot, (3) Meet in public campus locations. If you were scammed or received a misrepresented item, report the seller immediately using the report/flag option and contact support. For fraud or theft, contact campus security or local authorities.",
    steps: [
      "UniDeals does not process returns, refunds, or exchanges.",
      "ALWAYS inspect the item thoroughly before making payment.",
      "Test electronics (turn on, check ports, test battery) before paying.",
      "If the item doesn't match the listing, do NOT pay — walk away.",
      "Report the seller using the flag/report button on their profile or listing.",
      "For serious fraud, contact campus security or local authorities.",
      "Email support@campusmart.in with evidence for platform action.",
    ],
    route: "/contact",
    source: "UniDeals knowledge base",
    suggestions: ["What should I inspect before buying?", "How do I report a seller?", "Safety tips"],
  }),

  makeEntry({
    id: "payment_methods",
    title: "Payment Methods",
    keywords: [
      "payment method", "how to pay", "upi", "cash", "gpay", "phonepe",
      "paytm", "payment kaise kare", "online payment", "bank transfer",
      "card payment", "credit card", "debit card", "neft", "imps",
      "payment options", "kaise pay kare", "accepted payments", "cod",
      "cash on delivery",
    ],
    answer:
      "UniDeals supports direct peer-to-peer payments between students. The recommended methods are UPI (GPay, PhonePe, Paytm) and cash. Pay ONLY after meeting the seller in person and inspecting the item. UniDeals does NOT handle payments, escrow, or provide any payment gateway. Never send advance payments online before seeing the item. Never scan suspicious QR codes claiming to 'receive' money.",
    steps: [
      "Preferred: UPI payments (GPay, PhonePe, Paytm) at the time of exchange.",
      "Alternative: Cash payment at the meetup location.",
      "NEVER send advance payments or token amounts before inspecting the item.",
      "NEVER scan QR codes from sellers claiming you'll 'receive' money (common scam).",
      "Verify payment confirmation on YOUR OWN banking app.",
      "UniDeals does not handle money, escrow, or act as a payment intermediary.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["Is advance payment safe?", "How do I avoid scams?", "Safety tips for payments"],
  }),

  // ════════════════════════════════════════════════════════
  //  DELIVERY & PICKUP
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "no_delivery",
    title: "Does UniDeals Deliver?",
    keywords: [
      "delivery", "shipping", "courier", "deliver", "ship", "kya deliver hota hai",
      "home delivery", "deliver karega", "shipping available", "can you ship",
      "door delivery", "parcel", "send to my address", "mail",
      "delivery charges", "shipping cost", "ghar pe aayega",
    ],
    answer:
      "No, UniDeals does NOT offer delivery, shipping, or courier services. It's a campus pickup-only marketplace. Buyers and sellers meet in person at a safe public campus location to exchange the item and payment. This is by design — it ensures you can inspect the item before paying and keeps transactions safe. All exchanges happen within your campus community.",
    steps: [
      "UniDeals is a campus pickup-only marketplace — no delivery or shipping.",
      "Sellers specify a campus pickup location when creating a listing.",
      "Buyers and sellers agree on a meetup spot via in-app chat.",
      "Always choose public, well-lit campus locations (Library Gate, Main Canteen, Student Center).",
      "Inspect the item in person before paying.",
      "Never agree to off-campus or private location meetups.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["Where should I meet?", "How do I set a pickup address?", "Safety tips for meetups"],
  }),

  makeEntry({
    id: "pickup_tips",
    title: "Campus Pickup — Best Practices",
    keywords: [
      "pickup", "meetup", "campus meetup", "kahan mile", "meeting point",
      "pickup location", "best place to meet", "safe meeting", "pickup tips",
      "campus location", "where to meet", "meetup location", "kaha pe milna hai",
      "hostel meetup", "gate pe milte hain",
    ],
    answer:
      "For safe campus pickups: always meet in public, well-lit campus areas during daylight hours. Best spots include the Main Library Gate, Central Canteen, Student Activity Center, or Hostel Security Office. Bring a friend if possible. Inform someone about your meetup details. Never agree to meet at private rooms, off-campus locations, or late at night. Inspect the item and test electronics on the spot before paying.",
    steps: [
      "Choose a public, well-lit campus spot (Library Gate, Canteen, Student Center, Security Office).",
      "Meet during daylight hours — avoid late night meetups.",
      "Bring a friend or inform someone about the meetup details.",
      "Agree on exact time and location via in-app chat before meeting.",
      "Inspect the item thoroughly at the meetup before making payment.",
      "Walk away if anything feels suspicious — trust your instincts.",
      "Never meet at private rooms, hostels, or off-campus locations.",
    ],
    route: "/",
    source: "UniDeals knowledge base",
    suggestions: ["How do I pay safely?", "What should I inspect?", "How do I report a problem?"],
  }),

  // ════════════════════════════════════════════════════════
  //  AI ASSISTANT
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "what_can_ai_do",
    title: "What Can the AI Assistant Do?",
    keywords: [
      "what can you do", "ai features", "chatbot features", "kya kar sakta hai",
      "assistant features", "help me", "tum kya karte ho", "your capabilities",
      "what are your features", "ai assistant", "bot kya karega", "chatbot help",
      "how can you help", "what do you do", "tell me your features",
      "commands", "options", "available commands", "menu",
    ],
    answer:
      "I'm UniDeals AI — your campus marketplace assistant! Here's everything I can help with: 🔍 Find products by keyword, category, or budget. 💰 Estimate fair prices for items you want to buy or sell. 📝 Write compelling listing drafts for your products. ⚖️ Compare two products side by side. 🎒 Build budget bundles (e.g., 'hostel setup under ₹5000'). ✅ Get inspection checklists before buying used items. 🛡️ Get safety tips for meetups, payments, and avoiding scams. 📖 Navigate the platform (how to sell, buy, boost, upgrade, report). I support English and Hinglish!",
    steps: [
      "🔍 Product Search: 'Find cycles under 3000', 'Show electronics', 'Trending items'",
      "💰 Price Estimation: 'How much is a used laptop worth?', 'Fair price for my calculator'",
      "📝 Listing Draft: 'Help me write a listing for my books', 'Draft a post for my cycle'",
      "⚖️ Product Comparison: 'Compare these two phones'",
      "🎒 Budget Bundle: 'Room setup under 5000', 'Electronics under 3000'",
      "✅ Inspection Checklist: 'What to check before buying a laptop?'",
      "🛡️ Safety Tips: 'Is advance UPI payment safe?', 'Where should I meet?'",
      "📖 Platform Guide: 'How to sell?', 'How to boost?', 'How to upgrade?'",
    ],
    route: "/chat",
    source: "UniDeals knowledge base",
    suggestions: ["Find a cycle under 3000", "Help me sell my books", "Safety tips for meetups"],
  }),

  makeEntry({
    id: "ai_limitations",
    title: "What the AI Cannot Do",
    keywords: [
      "ai limitation", "can't do", "limitation", "kya nahi kar sakta",
      "not possible", "ai can't", "chatbot limit", "what can't you do",
      "bot limitation", "does the ai", "can the ai",
    ],
    answer:
      "I'm focused exclusively on UniDeals — the campus marketplace. I cannot: process payments or refunds, contact sellers on your behalf, guarantee product quality or seller honesty, provide medical/legal/financial advice, help with homework or exams, or answer questions unrelated to buying/selling on campus. For payment disputes, contact campus security or local authorities. For platform issues, reach out to support@campusmart.in.",
    steps: [
      "❌ Cannot process, handle, or guarantee payments or refunds.",
      "❌ Cannot contact sellers or make deals on your behalf.",
      "❌ Cannot guarantee product quality or seller reliability.",
      "❌ Cannot provide medical, legal, or financial advice.",
      "❌ Cannot help with homework, exams, or academic questions.",
      "❌ Cannot answer questions unrelated to the UniDeals marketplace.",
      "✅ For disputes or scams: report via the app or contact support@campusmart.in.",
    ],
    route: "/contact",
    source: "UniDeals knowledge base",
    suggestions: ["What can the AI do?", "How do I report a scam?", "How do I contact support?"],
  }),

  // ════════════════════════════════════════════════════════
  //  PRICING & SUBSCRIPTION — DETAILED
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "pro_vs_proplus",
    title: "Pro vs Pro+ — Detailed Comparison",
    keywords: [
      "pro vs pro plus", "pro vs pro+", "compare plans", "which plan",
      "pro ya pro plus", "plan comparison", "best plan", "pro better or pro+",
      "konsa plan", "pro kya hai", "pro plus kya hai", "difference between pro",
      "pro features", "pro plus features", "plan difference",
    ],
    answer:
      "Both Pro and Pro+ are one-time lifetime purchases — no monthly fees! Pro (₹99) is great for casual sellers: 25 active listings, 2 monthly boosts (3-day each), 100 wishlist saves, and high search priority. Pro+ (₹199) is for power sellers: unlimited listings, 5 monthly boosts (7-day each), unlimited wishlist, highest search priority (top of all results), and dedicated 24/7 priority support. If you sell frequently, Pro+ pays for itself with the extra boosts and visibility.",
    steps: [
      "Pro (₹99 lifetime): 25 active listings, 2 boosts/month (3-day), 100 wishlist, high priority, priority support.",
      "Pro+ (₹199 lifetime): Unlimited listings, 5 boosts/month (7-day), unlimited wishlist, highest priority, 24/7 dedicated support.",
      "Both plans are one-time purchases — no recurring monthly fees.",
      "Key difference: Pro+ gives 7-day boosts (vs 3-day) and unlimited everything.",
      "Recommendation: Choose Pro if you sell occasionally, Pro+ if you sell regularly.",
    ],
    route: "/price",
    source: "UniDeals knowledge base",
    suggestions: ["How do I upgrade?", "What are boost add-ons?", "Is the founder offer really lifetime?"],
  }),

  makeEntry({
    id: "boost_cost_details",
    title: "Boost Pricing and How It Works",
    keywords: [
      "boost cost", "boost price", "boost kitne ka", "boost kaise kare",
      "boost duration", "3 day boost", "7 day boost", "boost addon",
      "boost add on", "boost purchase", "boost khareedna", "extra boost",
      "how boost works", "boost kya karta hai", "boost benefit",
    ],
    answer:
      "Boosting pushes your listing to the top of search results with a 'Boosted' badge, giving it up to 3x more views. Boost options: (1) Use your monthly plan credits — Pro gets 2 boosts/month (3-day each), Pro+ gets 5 boosts/month (7-day each). (2) Purchase add-on boosts anytime — 3-Day Boost for ₹29 or 7-Day Boost for ₹49. Only active, listed products can be boosted. You can't stack multiple boosts on the same product simultaneously.",
    steps: [
      "Go to My Orders / My Listings.",
      "Find the active product you want to boost.",
      "Click 'Boost Listing'.",
      "Use your monthly plan boost credits if available, or purchase an add-on.",
      "Add-on options: 3-Day Boost (₹29), 7-Day Boost (₹49).",
      "Boosted products appear at the top of search with a 'Boosted' badge.",
      "Boost gives approximately 3x more views.",
      "One boost per product at a time — you can't stack boosts.",
    ],
    route: "/myorders",
    source: "UniDeals knowledge base",
    suggestions: ["Which plan should I get?", "How do I sell faster?", "Pro vs Pro+ comparison"],
  }),

  makeEntry({
    id: "founder_offer",
    title: "Founder Offer — Lifetime Access",
    keywords: [
      "founder offer", "lifetime access", "lifetime plan", "really lifetime",
      "one time payment", "founder pricing", "early bird", "launch offer",
      "kya sach mein lifetime", "founder plan", "permanent access",
    ],
    answer:
      "Yes, the Founder Offer is real — it's a one-time payment for lifetime access! Early members who join during the launch period get Pro (₹99) or Pro+ (₹199) permanently. No monthly fees, no annual renewals, no hidden charges. This special pricing is for early campus adopters and may increase in the future. Lock in your lifetime access now while the founder pricing is available!",
    steps: [
      "Founder pricing is a one-time payment — no recurring fees.",
      "Pro Founder: ₹99 for lifetime access to all Pro features.",
      "Pro+ Founder: ₹199 for lifetime access to all Pro+ features.",
      "This pricing is available only during the launch period.",
      "Prices may increase in the future — lock in now!",
      "Navigate to Subscription or Pricing page to upgrade.",
    ],
    route: "/price",
    source: "UniDeals knowledge base",
    suggestions: ["How do I upgrade?", "Pro vs Pro+ comparison", "What does Pro+ include?"],
  }),

  // ════════════════════════════════════════════════════════
  //  GREETINGS & COMMON CONVERSATION
  // ════════════════════════════════════════════════════════

  makeEntry({
    id: "greeting_hello",
    title: "Greeting — Hello/Hi",
    keywords: [
      "hello", "hi", "hey", "namaste", "hlo", "hii", "hiii",
      "good morning", "good afternoon", "good evening", "sup",
      "kya haal", "kaise ho", "how are you", "wassup", "yo",
      "hi there", "hey there", "greetings", "namaskar",
    ],
    answer:
      "Hey there! 👋 I'm UniDeals AI — your campus marketplace assistant. I can help you find products, estimate fair prices, write listings, get safety tips, and navigate the platform. What would you like to do today?",
    steps: [],
    route: null,
    source: "UniDeals knowledge base",
    suggestions: ["Find products", "Help me sell something", "How does UniDeals work?", "Safety tips"],
  }),

  makeEntry({
    id: "thank_you",
    title: "Thank You Response",
    keywords: [
      "thank you", "thanks", "dhanyavad", "shukriya", "thanku", "thnx",
      "thank u", "ty", "thx", "thanks a lot", "bohot shukriya", "bahut dhanyavad",
    ],
    answer:
      "You're welcome! 😊 Happy to help. If you have any more questions about buying, selling, pricing, or anything UniDeals, just ask! Good luck with your campus deals!",
    steps: [],
    route: null,
    source: "UniDeals knowledge base",
    suggestions: ["Find trending items", "How do I sell?", "Safety tips for meetups"],
  }),

  makeEntry({
    id: "goodbye",
    title: "Goodbye Response",
    keywords: [
      "bye", "goodbye", "see you", "alvida", "byebye", "bye bye",
      "good night", "cya", "later", "tata", "chalo bye", "ok bye",
    ],
    answer:
      "Goodbye! 👋 Happy dealing on UniDeals. Come back anytime you need help with buying, selling, pricing, or staying safe on campus. Have a great day!",
    steps: [],
    route: null,
    source: "UniDeals knowledge base",
    suggestions: ["Find products", "How does UniDeals work?", "Safety tips"],
  }),
];

export const getFullKnowledgeText = () =>
  ASSISTANT_KNOWLEDGE_BASE.map((entry) => {
    const steps = entry.steps.length
      ? `Steps:\n${entry.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`
      : "";
    return `${entry.title}\nAnswer: ${entry.answer}\n${steps}\nRoute: ${entry.route || "N/A"}`;
  }).join("\n\n");

export const findKnowledgeBaseAnswer = (message = "") => {
  const query = normalize(message);
  if (!query) return null;

  const queryTerms = new Set(splitTerms(query));

  const scored = ASSISTANT_KNOWLEDGE_BASE.map((entry) => {
    let score = 0;

    for (const keyword of entry.keywords) {
      if (query.includes(keyword)) score += keyword.includes(" ") ? 6 : 3;
      for (const term of splitTerms(keyword)) {
        if (queryTerms.has(term)) score += 1;
      }
    }

    return { entry, score };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;

  const best = scored[0].entry;
  const wantsAllTerms =
    /\b(all|everything|full|complete|entire)\b/i.test(message) &&
    /\b(terms|conditions|rules|legal)\b/i.test(message);

  if (wantsAllTerms) {
    const terms = ASSISTANT_KNOWLEDGE_BASE.find((entry) => entry.id === "terms_overview");
    return {
      ...terms,
      answer: `${terms.answer} The key sections are: acceptance, eligibility, UniDeals' role, user duties, prohibited activities, listing responsibility, intellectual property, liability limit, disputes, termination, and Indian governing law.`,
      confidence: "high",
    };
  }

  return { ...best, confidence: scored[0].score >= 6 ? "high" : "medium" };
};

export const formatKnowledgeReply = (entry) => {
  if (!entry) return null;

  const stepText = entry.steps?.length
    ? `\n\n${entry.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`
    : "";
  const routeText = entry.route ? `\n\nOpen: ${entry.route}` : "";

  return `${entry.answer}${stepText}${routeText}`;
};
