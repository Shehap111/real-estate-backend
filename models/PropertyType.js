import mongoose from 'mongoose';

const propertyTypeSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },
    image: {
      type: String, // URL image
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model('PropertyType', propertyTypeSchema);
