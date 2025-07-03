import express from 'express';
import {
  getContactInfo,
  updateContactInfo,
  createMessage,
  markMessageAsRead,
  getAllMessages,
  deleteMessage,
} from '../controllers/contactController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

//  Public routes
router.get('/', getContactInfo);              // Get contact info
router.post('/message', createMessage);       // User sends a message

//  Admin routes
router.patch('/', verifyAdmin, updateContactInfo);                 // Update contact info
router.get('/messages', verifyAdmin, getAllMessages);              // Get all messages
router.patch('/message/:messageId/read', verifyAdmin, markMessageAsRead); // Mark as read
router.delete('/message/:messageId', verifyAdmin, deleteMessage);

export default router;
