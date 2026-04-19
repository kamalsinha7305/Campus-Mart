import Address from "../models/Address.model.js";

// Create a new address
export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { line1, line2, city, state, pincode, isDefault } = req.body;

    // Validate required fields
    if (!line1 || !city || !state || !pincode) {
      return res.status(400).json({
        message: "Required fields: line1, city, state, pincode",
        success: false,
        error: true,
      });
    }

    // Check address count limit (maximum 3 addresses)
    const addressCount = await Address.countDocuments({ user: userId });
    if (addressCount >= 3) {
      return res.status(400).json({
        message: "Maximum 3 addresses allowed per user",
        success: false,
        error: true,
      });
    }

    // Check for duplicate address
    const duplicateAddress = await Address.findOne({
      user: userId,
      line1: line1.trim(),
      line2: (line2 || "").trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
    });

    if (duplicateAddress) {
      return res.status(400).json({
        message: "This address already exists",
        success: false,
        error: true,
      });
    }

    // Create address
    const address = new Address({
      user: userId,
      line1,
      line2: line2 || "",
      city,
      state,
      pincode,
      isDefault: isDefault || false,
    });

    await address.save();

    return res.status(201).json({
      message: "Address created successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("Error in createAddress:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// Get all addresses for a user
export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({ user: userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Addresses fetched successfully",
      success: true,
      error: false,
      addresses,
    });
  } catch (err) {
    console.error("Error in getUserAddresses:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// Get a specific address by ID
export const getAddressById = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

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
    console.error("Error in getAddressById:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;
    const { line1, line2, city, state, pincode, isDefault } = req.body;

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    // Prepare updated fields
    const updatedLine1 = line1 !== undefined ? line1 : address.line1;
    const updatedLine2 = line2 !== undefined ? line2 : address.line2;
    const updatedCity = city !== undefined ? city : address.city;
    const updatedState = state !== undefined ? state : address.state;
    const updatedPincode = pincode !== undefined ? pincode : address.pincode;

    // Check for duplicate address (excluding current address)
    if (
      line1 !== undefined ||
      line2 !== undefined ||
      city !== undefined ||
      state !== undefined ||
      pincode !== undefined
    ) {
      const duplicateAddress = await Address.findOne({
        user: userId,
        _id: { $ne: addressId }, // Exclude current address
        line1: updatedLine1.trim(),
        line2: updatedLine2.trim(),
        city: updatedCity.trim(),
        state: updatedState.trim(),
        pincode: updatedPincode.trim(),
      });

      if (duplicateAddress) {
        return res.status(400).json({
          message: "This address already exists",
          success: false,
          error: true,
        });
      }
    }

    // Update fields
    if (line1 !== undefined) address.line1 = line1;
    if (line2 !== undefined) address.line2 = line2;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    return res.status(200).json({
      message: "Address updated successfully",
      success: true,
      error: false,
      address,
    });
  } catch (err) {
    console.error("Error in updateAddress:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
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
    console.error("Error in deleteAddress:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// Set default address
export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId } = req.params;

    // First, unset all default addresses for this user
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );

    // Set the specified address as default
    const address = await Address.findOneAndUpdate(
      { _id: addressId, user: userId },
      { $set: { isDefault: true } },
      { new: true }
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
    console.error("Error in setDefaultAddress:", err);
    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};