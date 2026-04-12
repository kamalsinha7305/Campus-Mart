export const successResponse = (
  res,
  message,
  data = null,
  status = 200,
  pagination = null,
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(status).json(response);
};

export const errorResponse = (res, message, status = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(status).json(response);
};
