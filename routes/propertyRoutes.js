import express from 'express';
import {
  createProperty,
  getAllProperties,
  getAllPropertiesAdmin,
  getPropertyBySlug,
  updateProperty,
  deleteProperty,
  togglePropertyStatus,
} from '../controllers/propertyController.js';
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import Property from '../models/Property.js';
import {checkActiveBySlug} from '../middleware/checkActive.js';


const router = express.Router();

// Admin routes
router.post('/',verifyAdmin, createProperty);
router.put('/:id',verifyAdmin, updateProperty);
router.delete('/:id',verifyAdmin, deleteProperty);
router.get('/admin/all',verifyAdmin, getAllPropertiesAdmin);
router.patch('/:id/toggle',verifyAdmin, togglePropertyStatus);

// Public routes
router.get('/', getAllProperties);
router.get('/:slug', checkActiveBySlug(Property), getPropertyBySlug);

// @route GET /api/properties/:slug/meta
router.get('/:slug/meta', async (req, res) => {
  try {
    const { slug } = req.params;

    const property = await Property.findOne({ slug, isActive: true }).select('title description');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error fetching property meta:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;
