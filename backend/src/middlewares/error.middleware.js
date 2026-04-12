import { errorResponse } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  return errorResponse(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500,
  );
};
