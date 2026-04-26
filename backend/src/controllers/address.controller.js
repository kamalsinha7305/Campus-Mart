import mongoose from "mongoose";
import Address from "../models/Address.model.js";

// CREATE ADDRESS
export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    let { line1, line2, city, state, pincode, isDefault } = req.body;

    if (!line1 || !city || !state || !pincode) {
      return res.status(400).json({
        message: "Required fields: line1, city, state, pincode",
        success: false,
        error: true,
      });
    }

    // Normalize
    line1 = line1.trim();
    line2 = (line2 || "").trim();
    city = city.trim();
    state = state.trim();
    pincode = pincode.trim();

    // Limit check
    const count = await Address.countDocuments({ user: userId });
    if (count >= 3) {
      return res.status(400).json({
        message: "Maximum 3 addresses allowed",
        success: false,
        error: true,
      });
    }

    // Duplicate check
    const exists = await Address.findOne({
      user: userId,
      line1,
      line2,
      city,
      state,
      pincode,
    }).lean();

    if (exists) {
      return res.status(400).json({
        message: "This address already exists",
        success: false,
        error: true,
      });
    }

    const address = await Address.create({
      user: userId,
      line1,
      line2,
      city,
      state,
      pincode,
      isDefault: isDefault || false,
    });

    return res.status(201).json({
      message: "Address created successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("createAddress error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// GET USER ADDRESSES
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Addresses fetched successfully",
      success: true,
      error: false,
      addresses,
    });
  } catch (err) {
    console.error("getUserAddresses error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// GET ADDRESS BY ID
export const getAddressById = async (req, res) => {
  try {
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        message: "Invalid address ID",
        success: false,
        error: true,
      });
    }

    const address = await Address.findOne({
      _id: addressId,
      user: req.userId,
    }).lean();

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Address fetched successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("getAddressById error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOne({
      _id: addressId,
      user: req.userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    const fields = ["line1", "line2", "city", "state", "pincode"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        address[field] = req.body[field];
      }
    });

    if (req.body.isDefault !== undefined) {
      address.isDefault = req.body.isDefault;
    }

    await address.save();

    return res.status(200).json({
      message: "Address updated successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("updateAddress error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({
      _id: addressId,
      user: req.userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Address deleted successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("deleteAddress error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    await Address.updateMany(
      { user: req.userId },
      { $set: { isDefault: false } },
    );

    const address = await Address.findOneAndUpdate(
      { _id: addressId, user: req.userId },
      { $set: { isDefault: true } },
      { new: true },
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Default address set successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("setDefaultAddress error:", err);

    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
};
