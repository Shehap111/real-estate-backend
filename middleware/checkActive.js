// middlewares/checkActive.js

export const checkActiveById = (Model) => {
  return async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (!item.isActive) {
        return res.status(403).json({ message: 'Item is deactivated' });
      }

      req.item = item;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
};

export const checkActiveBySlug = (Model) => {
  return async (req, res, next) => {
    try {
      const item = await Model.findOne({ slug: req.params.slug });

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (!item.isActive) {
        return res.status(403).json({ message: 'Item is deactivated' });
      }

      req.item = item;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
};

