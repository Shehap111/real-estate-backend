import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const City = mongoose.model('City', citySchema);
export default City;
