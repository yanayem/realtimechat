import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
import process from 'process';

const router = express.Router();

// --- 1. SIGN UP ROUTE ---
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, gender } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create new user (Password hashing happens in the User model pre-save hook)
    const user = await User.create({
      name,
      email,
      phone,
      password,
      gender
    });

    if (user) {
      res.status(201).json({ message: "Registration successful!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
});

// --- 2. LOG IN ROUTE ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Use the comparePassword method defined in your User model
    if (user && (await user.comparePassword(password))) {
      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '30d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

export default router;