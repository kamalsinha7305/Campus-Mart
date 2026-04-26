// unchanged import
import Product from "../models/Product.model.js";
import { PRODUCT_STATUS } from "../config/constants.js";

export const createProduct = async (data, user) => {
  if (!data.images || data.images.length === 0) {
    throw new Error("Images are required");
  }

  const normalizedTitle = data.title.trim().toLowerCase();
  const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const safeTitle = escapeRegex(normalizedTitle);

  const FIVE_MINUTES_AGO = new Date(Date.now() - 5 * 60 * 1000);

  const existingProduct = await Product.findOne({
    seller_id: user._id,
    category: data.category,
    title: { $regex: `^${safeTitle}$`, $options: "i" },
    selling_price: {
      $gte: data.selling_price * 0.9,
      $lte: data.selling_price * 1.1,
    },
    createdAt: { $gte: FIVE_MINUTES_AGO },
    is_deleted: false,
  });

  if (existingProduct) {
    throw new Error(
      "You already listed a similar product recently. Please wait before posting again.",
    );
  }

  data.seller_id = user._id;

  if (user.current_lat != null && user.current_long != null) {
    data.location = {
      type: "Point",
      coordinates: [user.current_long, user.current_lat],
    };
  }

  if (data.attributes?.purchase_date) {
    data.attributes.purchase_date = new Date(data.attributes.purchase_date);
  }

  if (data.original_price && data.selling_price > data.original_price) {
    throw new Error("Selling price cannot be greater than original price");
  }

  return await Product.create(data);
};

// BOOSTED PRODUCTS
export const getBoostedProducts = async () => {
  const now = new Date();

  return await Product.find({
    is_boosted: true,
    boost_expires_at: { $gt: now },
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  })
    .sort({ boost_expires_at: -1 })
    .limit(10)
    .select("title images selling_price createdAt")
    .lean();
};

// MAIN FEED
export const getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    min_price,
    max_price,
    sort,
  } = query;

  const skip = (Number(page) - 1) * Number(limit);
  const now = new Date();

  const filter = {
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  };

  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;

  if (min_price || max_price) {
    filter.selling_price = {};
    if (min_price) filter.selling_price.$gte = Number(min_price);
    if (max_price) filter.selling_price.$lte = Number(max_price);
  }

  const pipeline = [
    { $match: filter },

    {
      $addFields: {
        hoursSinceCreated: {
          $divide: [{ $subtract: [now, "$createdAt"] }, 1000 * 60 * 60],
        },
      },
    },

    {
      $addFields: {
        recencyScore: {
          $divide: [1, { $add: ["$hoursSinceCreated", 1] }],
        },
        popularityScore: {
          $log10: { $add: ["$views_count", 1] },
        },
        trendingScore: {
          $cond: [{ $gt: ["$views_count", 20] }, 10, 0],
        },
      },
    },

    {
      $addFields: {
        score: {
          $add: [
            { $multiply: ["$recencyScore", 30] },
            { $multiply: ["$popularityScore", 10] },
            "$trendingScore",
          ],
        },
      },
    },
  ];

  // sorting
  if (sort === "price_low") pipeline.push({ $sort: { selling_price: 1 } });
  else if (sort === "price_high")
    pipeline.push({ $sort: { selling_price: -1 } });
  else if (sort === "latest") pipeline.push({ $sort: { createdAt: -1 } });
  else pipeline.push({ $sort: { score: -1 } });

  pipeline.push({ $skip: skip }, { $limit: Number(limit) });

  pipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "seller_id",
        foreignField: "_id",
        as: "seller",
      },
    },
    {
      $unwind: {
        path: "$seller",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        images: 1,
        selling_price: 1,
        category: 1,
        createdAt: 1,
        views_count: 1,
        score: 1,
        "seller._id": 1,
        "seller.name": 1,
        "seller.avatar": 1,
      },
    },
  );

  const [products, total] = await Promise.all([
    Product.aggregate(pipeline),
    Product.countDocuments(filter),
  ]);

  return {
    data: products,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

// SINGLE PRODUCT
export const getSingleProduct = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, is_deleted: false },
    { $inc: { views_count: 1 } },
    { new: true },
  )
    .populate("seller_id", "name avatar")
    .lean();

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
