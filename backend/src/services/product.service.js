import Product from "../models/Product.model.js";
import { PRODUCT_STATUS } from "../config/constants.js";

export const createProduct = async (data, user) => {
  // Duplicate check
  const FIVE_MINUTES_AGO = new Date(Date.now() - 5 * 60 * 1000);

  const existingProduct = await Product.findOne({
    seller_id: user._id,
    title: data.title,
    selling_price: data.selling_price,
    createdAt: { $gte: FIVE_MINUTES_AGO },
  });

  if (existingProduct) {
    throw new Error("You already listed a similar product recently");
  }

  // Attach seller
  data.seller_id = user._id;

  // Location handling
  if (user.current_lat !== null && user.current_long !== null) {
    data.location = {
      type: "Point",
      coordinates: [user.current_long, user.current_lat],
    };
  } else {
    delete data.location;
  }

  // Convert purchase_date
  if (data.attributes?.purchase_date) {
    data.attributes.purchase_date = new Date(data.attributes.purchase_date);
  }

  // Price validation
  if (data.original_price && data.selling_price > data.original_price) {
    throw new Error("Selling price cannot be greater than original price");
  }

  const product = await Product.create(data);

  return product;
};

export const getAllProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    min_price,
    max_price,
    sort = "latest",
  } = query;

  const filter = {
    is_deleted: false,
    status: PRODUCT_STATUS.LISTED,
  };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) {
    filter.category = category;
  }

  if (min_price || max_price) {
    filter.selling_price = {};
    if (min_price) filter.selling_price.$gte = Number(min_price);
    if (max_price) filter.selling_price.$lte = Number(max_price);
  }

  let sortOption = {};
  if (sort === "price_low") sortOption = { selling_price: 1 };
  else if (sort === "price_high") sortOption = { selling_price: -1 };
  else sortOption = { createdAt: -1 };

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate("seller_id", "name avatar"),
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

export const getSingleProduct = async (id) => {
  const product = await Product.findOne({
    _id: id,
    is_deleted: false,
  }).populate("seller_id", "name avatar");

  if (!product) {
    throw new Error("Product not found");
  }

  product.views_count += 1;
  await product.save();

  return product;
};
