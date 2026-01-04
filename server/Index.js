import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import http from 'http';
import process from 'process';

// Import your auth logic (MUST add .js extension)
import authRoutes from './controllers/auth.js'; 
// Add this import at the top of index.js
import messageRoutes from './controllers/Message.js';
import userRoutes from './routes/user.js'; // Ensure the .js extension


dotenv.config();
const app = express();
const server = http.createServer(app);

// MIDDLEWARE
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('👤 User Connected:', socket.id);

  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`🏠 User ${userId} joined their room`);
  });

  socket.on('send_message', (data) => {
    // data should contain: { receiverId, text, senderId }
    io.to(data.receiverId).emit('receive_message', data);
  });

  socket.on('disconnect', () => console.log('👋 User Disconnected'));
});

// API ROUTES
app.use('/api/auth', authRoutes); // Connects login/signup logic

// Add this line where your other routes are
app.use('/api/messages', messageRoutes);
// BASE ROUTE
app.get('/', (req, res) => res.send("Chat Server Active"));

// ... other middleware
app.use('/api/users', userRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));