const notFoundtMiddleware = (reg, res, next) => {
  res.status(404).json({ message: 'Not found' });
};

export default notFoundtMiddleware;