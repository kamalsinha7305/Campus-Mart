import mongoose from "mongoose";

import Report from "../models/Report.model.js";
import Product from "../models/Product.model.js";
import User from "../models/User.model.js";

const MAX_REPORTS_PER_HOUR = 10;

const validateReportRateLimit = async (userId) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const reportsCount = await Report.countDocuments({
    reporter_id: userId,
    createdAt: { $gte: oneHourAgo },
  });

  if (reportsCount >= MAX_REPORTS_PER_HOUR) {
    throw new Error("Too many reports submitted. Please try again later.");
  }
};

export const reportProduct = async (productId, data, user) => {
  // Validate Product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  // Validate Report Reason
  if (!data.reason) {
    throw new Error("Report reason is required");
  }

  // Check Product Exists
  const product = await Product.findOne({
    _id: productId,
    is_deleted: false,
  })
    .select("seller_id")
    .lean();

  if (!product) {
    throw new Error("Product not found");
  }

  // Prevent Self Report
  if (product.seller_id.toString() === user._id.toString()) {
    throw new Error("You cannot report your own product");
  }

  // Rate Limit Validation
  await validateReportRateLimit(user._id);

  try {
    const report = await Report.create({
      reporter_id: user._id,

      target_id: productId,
      target_model: "Product",

      reason: data.reason,
      description: data.description,
    });

    return report;
  } catch (error) {
    // Duplicate Report
    if (error.code === 11000) {
      throw new Error("You have already reported this product");
    }

    throw error;
  }
};

export const reportUser = async (targetUserId, data, user) => {
  // Validate User ID
  if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
    throw new Error("Invalid user ID");
  }

  // Validate Report Reason
  if (!data.reason) {
    throw new Error("Report reason is required");
  }

  // Prevent Self Report
  if (targetUserId.toString() === user._id.toString()) {
    throw new Error("You cannot report yourself");
  }

  // Check User Exists
  const targetUser = await User.findOne({
    _id: targetUserId,
  })
    .select("_id")
    .lean();

  if (!targetUser) {
    throw new Error("User not found");
  }

  // Rate Limit Validation
  await validateReportRateLimit(user._id);

  try {
    const report = await Report.create({
      reporter_id: user._id,

      target_id: targetUserId,
      target_model: "User",

      reason: data.reason,
      description: data.description,
    });

    return report;
  } catch (error) {
    // Duplicate Report
    if (error.code === 11000) {
      throw new Error("You have already reported this user");
    }

    throw error;
  }
};
