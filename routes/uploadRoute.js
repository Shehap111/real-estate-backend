import express from 'express';
// import { upload } from '../config/uploadConfig.js';
// import uploadImage from '../controllers/uploadController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

// router.post('/upload', verifyAdmin, upload.single('image'), uploadImage);
// router.post('/upload-360', verifyAdmin, upload.single('image360'), uploadImage);

export default router;
