import express from 'express';
import {
  createPropertyType,
  getAllPropertyTypes,
  getPropertyTypeById,
  updatePropertyType,
  deletePropertyType,
  togglePropertyTypeStatus,
  getAllPropertyTypesAdmin,
} from '../controllers/propertyTypeController.js';

import {checkActiveById} from '../middleware/checkActive.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import PropertyType from '../models/PropertyType.js';

const router = express.Router();

// @desc Create new property type
router.post('/', verifyAdmin, createPropertyType);

// @desc Get all property types (active only)
router.get('/', getAllPropertyTypes);

// @desc Get property type by ID (only if active)
router.get('/:id', checkActiveById(PropertyType), getPropertyTypeById);

// @desc Update property type
router.put('/:id', verifyAdmin, updatePropertyType);

// @desc Delete property type
router.delete('/:id', verifyAdmin, deletePropertyType);

// @desc Toggle property type status (active/inactive)
router.patch('/:id/toggle', verifyAdmin, togglePropertyTypeStatus);

// ✅ Admin - Get all types including inactive
router.get('/admin/all', verifyAdmin, getAllPropertyTypesAdmin);

export default router;
