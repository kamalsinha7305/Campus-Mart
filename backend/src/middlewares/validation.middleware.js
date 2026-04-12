import { errorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.body = data;
    next();
  } catch (error) {
    return errorResponse(res, "Validation Error", 400, error.errors);
  }
};
