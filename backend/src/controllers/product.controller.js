import * as productService from "../services/product.service.js";
import { successResponse } from "../utils/response.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body, req.user);

    return successResponse(res, "Product created successfully", product, 201);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts(req.query);

    return successResponse(
      res,
      "Products fetched successfully",
      result.data,
      200,
      result.pagination,
    );
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await productService.getSingleProduct(req.params.id);

    return successResponse(res, "Product fetched successfully", product);
  } catch (error) {
    next(error);
  }
};
