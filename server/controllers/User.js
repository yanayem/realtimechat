import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users except the currently logged-in user
router.get('/all/:currentUserId', async (req, res) => {
  try {
    const { currentUserId } = req.params;
    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get specific user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User not found" });
  }
});

// Update profile (e.g., Avatar or Status)
router.put('/update', async (req, res) => {
  const { userId, name, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { name, avatar }, { new: true });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;