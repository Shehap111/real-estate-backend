import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cityRoutes from './routes/cityRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import propertyTypeRoutes  from './routes/propertyTypeRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
import path from 'path';
import propertyRoutes from './routes/propertyRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js'
dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // أو دومين الموقع بتاعك لما ترفعه
  credentials: true,
}));

app.use(express.json());

// Static folder for uploaded images
app.use('/uploads', express.static(path.join('uploads')));


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/property-types', propertyTypeRoutes);
app.use('/api', uploadRoute);
app.use('/api/properties', propertyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

// Connect to DB and Start Server
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

export default app;