import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    metaTitle: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    metaDescription: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    image: {
      type: String,
      required: true,
    },
    author: {
        type: String,
        required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
