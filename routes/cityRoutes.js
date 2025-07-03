import express from 'express';
import {
  createCity,
  getAllCities,
  updateCity,
  deleteCity, // ✅ ضفناها هنا
} from '../controllers/cityController.js';
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// Get all cities
router.get('/', getAllCities);

// Create a new city (Admin only)
router.post('/', verifyAdmin, createCity);

// Update a city (Admin only)
router.patch('/:id', verifyAdmin, updateCity);

// ✅ Delete a city (Admin only)
router.delete('/:id', verifyAdmin, deleteCity);

export default router;
