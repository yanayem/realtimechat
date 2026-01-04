import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// --- 1. Get Chat History between two users ---
router.get('/:userId/:otherId', async (req, res) => {
  try {
    const { userId, otherId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherId },
        { sender: otherId, receiver: userId }
      ]
    }).sort({ createdAt: 1 }); // Sort by time (oldest to newest)

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// --- 2. Save a Message (Called when someone hits 'Send') ---
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving message" });
  }
});

export default router;