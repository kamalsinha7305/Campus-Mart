import mongoose from "mongoose";
import Report from "../models/Report.model.js";
import Product from "../models/Product.model.js";

export const reportProduct = async (productId, data, user) => {
  // VALIDATE PRODUCT ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  // CHECK PRODUCT EXISTS
  const product = await Product.findOne({
    _id: productId,
    is_deleted: false,
  })
    .select("seller_id")
    .lean();

  if (!product) {
    throw new Error("Product not found");
  }

  // PREVENT SELF REPORT
  if (product.seller_id.toString() === user._id.toString()) {
    throw new Error("You cannot report your own product");
  }

  // CREATE REPORT (HANDLE DUPLICATE SAFELY)
  try {
    const report = await Report.create({
      reporter_id: user._id,
      product_id: productId,
      reason: data.reason,
      message: data.message,
    });

    return report;
  } catch (error) {
    // Handle duplicate report (unique index)
    if (error.code === 11000) {
      throw new Error("You have already reported this product");
    }

    throw error;
  }
};
