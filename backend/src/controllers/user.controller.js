import userModel from "../models/User.model.js";
import { USER_STATUS } from "../config/constants.js";

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel
      .findById(userId)
      .select("-password -refresh_token -verifyTokenEmail")
      .lean();

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "User Profile Fetched Successfully",
      success: true,
      error: false,
      user: user, // keep same key for frontend
    });
  } catch (err) {
    console.error("Error fetching in getUserProfile", err);

    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { mobile, gender } = req.body;

    const updateData = {};

    // Mobile validation
    if (mobile !== undefined) {
      if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({
          message: "Mobile must be 10 digits",
          success: false,
          error: true,
        });
      }
      updateData.mobile = mobile;
    }

    // Gender validation
    if (gender !== undefined) {
      const allowed = ["male", "female", "other"];
      if (!allowed.includes(gender)) {
        return res.status(400).json({
          message: "Invalid gender value",
          success: false,
          error: true,
        });
      }
      updateData.gender = gender;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      })
      .select("-password -refresh_token")
      .lean();

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      error: false,
      user: updatedUser, // keep same key
    });
  } catch (err) {
    console.error("Error updating profile:", err);

    return res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

// DELETE ACCOUNT (SOFT DELETE)
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.userId;

    const deletedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        status: USER_STATUS.INACTIVE,
        refresh_token: null,
      },
      { new: true },
    );

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found or already deleted",
        success: false,
        error: true,
      });
    }

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    };

    res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json({
        message: "Account deleted successfully",
        success: true,
        error: false,
      });
  } catch (err) {
    console.error("Error in deleteAccount controller:", err);

    return res.status(500).json({
      message: err.message || "Server error while deleting account",
      success: false,
      error: true,
    });
  }
};