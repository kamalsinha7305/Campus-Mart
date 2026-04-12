import * as reportService from "../services/report.service.js";
import { successResponse } from "../utils/response.js";

export const reportProduct = async (req, res, next) => {
  try {
    const report = await reportService.reportProduct(
      req.params.productId,
      req.body,
      req.user,
    );

    return successResponse(res, "Product reported successfully", report, 201);
  } catch (error) {
    next(error);
  }
};
