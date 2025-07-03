import Contact from '../models/contact.js'

// 1. Get Contact Info
export const getContactInfo = async (req, res) => {
    try {
      const contact = await Contact.findOne();
      if (!contact) {
        return res.status(404).json({ message: 'Contact info not found' });
      }
      res.status(200).json(contact.contactInfo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // 2. Update Contact Info (Admin only)
  export const updateContactInfo = async (req, res) => {
    try {
      let contact = await Contact.findOne();
      if (!contact) {
        contact = await Contact.create({ contactInfo: req.body });
      } else {
        contact.contactInfo = req.body;
        await contact.save();
      }
      res.status(200).json({ message: 'Contact info updated', data: contact.contactInfo });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // 3. Create Message (from user)
  export const createMessage = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      let contact = await Contact.findOne();
      if (!contact) {
        contact = await Contact.create({ contactInfo: {}, messages: [] });
      }
      contact.messages.push({ name, email, phone, message });
      await contact.save();
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// 4. Mark Message as Read
export const markMessageAsRead = async (req, res) => {
    try {
      const { messageId } = req.params;
      const parsedId = typeof messageId === "object" ? messageId.id : messageId;
      

      const contact = await Contact.findOne();
      if (!contact) {
        return res.status(404).json({ message: 'Contact module not found' });
      }
  
      const message = contact.messages.find(
        (msg) => msg._id.toString() === parsedId.toString()
      );
      
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      message.isRead = true;
      await contact.save();
  
      res.status(200).json({ message: 'Message marked as read' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
// 5. Get All Messages (Admin only)
export const getAllMessages = async (req, res) => {
    try {
      const contact = await Contact.findOne();
      if (!contact) {
        return res.status(404).json({ message: 'Contact module not found' });
      }
  
      const sortedMessages = [...contact.messages].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      res.status(200).json(sortedMessages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// 5. deleteMessage Message (Admin only)
export const deleteMessage = async (req, res) => {
    try {
      const { messageId } = req.params;
  
      const contact = await Contact.findOne();
      if (!contact) {
        return res.status(404).json({ message: 'Contact module not found' });
      }
  
      const messageExists = contact.messages.some(
        (msg) => msg._id.toString() === messageId
      );
  
      if (!messageExists) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      // حذف الرسالة يدويًا
      contact.messages = contact.messages.filter(
        (msg) => msg._id.toString() !== messageId
      );
  
      await contact.save();
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  