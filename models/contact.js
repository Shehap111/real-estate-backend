import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const contactModuleSchema = new mongoose.Schema(
  {
    contactInfo: {
      email: { type: String },
    description: {
        en: { type: String},
        ar: { type: String},
    },
    logo: {
      type: String, 
      required: true,
    },
      phone: {type: String},
      address: { type: String },
      locationLink: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      whatsapp: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
      tiktok: { type: String },
      snapchat: { type: String },
      telegram: { type: String },
      threads: { type: String },
      x: { type: String }, // Twitter (X)
      website: { type: String },
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactModuleSchema, 'contact');
export default Contact;
