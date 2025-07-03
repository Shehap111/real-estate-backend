import Property from '../models/Property.js';
import limax from 'limax';

// 1. Get only active properties (for public use)
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isActive: true })
      .populate('propertyTypeId')
      .populate('cityId')
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get all properties (admin only)
export const getAllPropertiesAdmin = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('propertyTypeId')
      .populate('cityId')
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Toggle property active status (admin only)
export const togglePropertyStatus = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Toggle active status
    property.isActive = !property.isActive;
    await property.save();

    res.status(200).json({ isActive: property.isActive });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



export const createProperty = async (req, res) => {
  try {
    let {
      slug,
      title,
      description,
      location,
      price,
      operationType,
      propertyTypeId,
      cityId,
      bedrooms,
      bathrooms,
      area,
      images,
      videoUrl,
      image360, 
      mapLocation,
      rating,
      isActive,
    } = req.body;

    // ✅ توليد slug لو مش موجود أو تنظيفه لو موجود
    if (!slug) {
      if (!title?.ar) {
        return res.status(400).json({ error: 'Either slug or Arabic title is required' });
      }
      slug = limax(title.ar, { tone: false, separator: '-' });
    } else {
      slug = limax(slug, { tone: false, separator: '-' });
    }

    // ✅ التأكد من عدم التكرار
    let finalSlug = slug;
    let count = 1;
    while (await Property.exists({ slug: finalSlug })) {
      finalSlug = `${slug}-${count++}`;
    }

    const newProperty = new Property({
      slug: finalSlug,
      title,
      description,
      location,
      price,
      operationType,
      propertyTypeId,
      cityId,
      bedrooms,
      bathrooms,
      area,
      images,
      videoUrl,
      image360, 
      rating,
      mapLocation,
      isActive,
    });

    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
};




// Get property by slug (public)
export const getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug, isActive: true })
      .populate('propertyTypeId')
      .populate('cityId');
    if (!property) {
      console.warn("⚠️ Property not found with slug:", req.params.slug);
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    console.error("🔥 Internal Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};


// Update property (admin only)
export const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete property (admin only)
export const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
