import { buildAssistantReply } from "../services/assistant.service.js";

export const chatWithAssistant = async (req, res, next) => {
  try {
    const result = await buildAssistantReply({
      message: req.body.message,
      history: req.body.history,
      user: req.user || null,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
