export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message =
    statusCode >= 500
      ? "Something went wrong on the server."
      : error.message;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(error.extra || {}),
  });
};
