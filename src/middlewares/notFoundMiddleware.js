const notFoundtMiddleware = (reg, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Not found',
    data: [],
  });
};

export default notFoundtMiddleware;
