import mongoose from 'mongoose';
import limax from 'limax';

const propertySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  location: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  price: {
    type: Number,
    required: true,
  },
  operationType: {
    type: String,
    enum: ['sale', 'rent'],
    required: true,
  },
  propertyTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyType',
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  image360: {
    type: String, 
    default: "",
  },
  videoUrl: {
    type: String,
  },
  mapLocation: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },  
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate slug before save
propertySchema.pre('save', async function (next) {
    if (!this.slug && this.title?.ar) {
      let baseSlug = limax(this.title.ar, { lang: 'ar' }); // ✅ بيدعم العربي فعليًا
      let slugValue = baseSlug;
      let count = 1;
  
      while (await mongoose.models.Property.exists({ slug: slugValue })) {
        slugValue = `${baseSlug}-${count++}`;
      }
  
      this.slug = slugValue;
    }
  
    next();
  });

const Property = mongoose.model('Property', propertySchema);

export default Property;
