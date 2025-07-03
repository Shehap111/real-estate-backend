import PropertyType from '../models/PropertyType.js';

// @desc Create new property type
export const createPropertyType = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name?.en || !name?.ar || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newType = await PropertyType.create({ name, image });
    res.status(201).json(newType);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get all active property types
export const getAllPropertyTypes = async (req, res) => {
  try {
    const types = await PropertyType.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get property type by ID
export const getPropertyTypeById = async (req, res) => {
  try {
    const type = await PropertyType.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Property type not found' });
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Update property type
export const updatePropertyType = async (req, res) => {
  try {
    const { name, image } = req.body;

    const updated = await PropertyType.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Property type not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Delete property type
export const deletePropertyType = async (req, res) => {
  try {
    const deleted = await PropertyType.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Property type not found' });
    res.json({ message: 'Property type deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Toggle activation status
export const togglePropertyTypeStatus = async (req, res) => {
  try {
    const type = await PropertyType.findById(req.params.id);
    if (!type) return res.status(404).json({ message: 'Property type not found' });

    type.isActive = !type.isActive;
    await type.save();

    res.json({ message: 'Status updated', isActive: type.isActive });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// @desc Admin - Get all property types (active & inactive)
export const getAllPropertyTypesAdmin = async (req, res) => {
    try {
      const types = await PropertyType.find().sort({ createdAt: -1 });
      res.json(types);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };