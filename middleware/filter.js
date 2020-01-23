const filter = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    if (req.query.priceMax || req.query.priceMin) {
      filter.price = {};
      if (req.query.priceMax) {
        filter.price.$lte = req.query.priceMax;
      }
      if (req.query.priceMin) {
        filter.price.$gte = req.query.priceMin;
      }
    }

    req.filter = filter;

    return next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = filter;
