import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import cityRoutes from './routes/cityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import propertyTypeRoutes from './routes/propertyTypeRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// CORS config
app.use(
  cors({
    origin: 'https://real-estate-frontend-tan.vercel.app/', // عدلها حسب الفرونت
    credentials: true,
  })
);

// ✅ Connect to DB
connectDB();

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('🏠 Real Estate API is running...');
});

// ✅ API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/property-types', propertyTypeRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Export app for Vercel
export default app;
