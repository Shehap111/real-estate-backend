import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import cityRoutes from './routes/cityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import propertyTypeRoutes from './routes/propertyTypeRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // غيره لدومين الفرونت لما ترفعه
  credentials: true,
}));
app.use(express.json());

// Static folder for uploaded images
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use('/api/admin', adminRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/property-types', propertyTypeRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;

// اتصال بقاعدة البيانات
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

connectDB();

export default app;
