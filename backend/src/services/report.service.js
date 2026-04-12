import Report from "../models/Report.model.js";
import Product from "../models/Product.model.js";

export const reportProduct = async (productId, data, user) => {
  const product = await Product.findOne({
    _id: productId,
    is_deleted: false,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.seller_id.toString() === user._id.toString()) {
    throw new Error("You cannot report your own product");
  }

  const existingReport = await Report.findOne({
    reporter_id: user._id,
    product_id: productId,
  });

  if (existingReport) {
    throw new Error("You have already reported this product");
  }

  const report = await Report.create({
    reporter_id: user._id,
    product_id: productId,
    reason: data.reason,
    message: data.message,
  });

  return report;
};
