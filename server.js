import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';

import cityRoutes from '../routes/cityRoutes.js';
import adminRoutes from '../routes/adminRoutes.js';
import propertyTypeRoutes from '../routes/propertyTypeRoutes.js';
import propertyRoutes from '../routes/propertyRoutes.js';
import blogRoutes from '../routes/blogRoutes.js';
import contactRoutes from '../routes/contactRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: "https://real-estate-frontend-tan.vercel.app", // دومين الفرونت النهائي
  credentials: true,
}));
app.use(express.json());

// Static folder (اختياري)
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get("/", (req, res) => {
  res.send("✅ API is running on Vercel serverless function");
});
app.use('/api/admin', adminRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/property-types', propertyTypeRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// تأكد من الاتصال بقاعدة البيانات قبل كل ريكويست
await connectDB();

// Export Express app كـ handler متوافق مع Vercel
export default app;
