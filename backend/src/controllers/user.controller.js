import userModel from "../models/User.model.js";

export const getUserProfile = async (req, res) => {

    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

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
            user: user
        });
    }
    catch (err) {
        console.error("Error fetching in getUserProfile", err);
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        });

    }

};