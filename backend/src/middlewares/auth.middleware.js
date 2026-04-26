import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { USER_STATUS } from "../config/constants.js";

const auth = async (req, res, next) => {
  try {
    let token;

    // Get token from cookies or header
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Access token required",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    const user = await User.findById(decoded.id)
      .select("-password -refresh_token")
      .lean();

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Block inactive/suspended users
    if (user.status !== USER_STATUS.ACTIVE) {
      return res.status(403).json({
        message: "Account is inactive or suspended",
        success: false,
        error: true,
      });
    }

    req.userId = user._id;
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: true,
    });
  }
};

export default auth;