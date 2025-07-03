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

export default router;
