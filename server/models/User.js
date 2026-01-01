import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true 
  },
  phone: { 
    type: String,
    trim: true
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true,
    lowercase: true, // Converts email to lowercase automatically
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  AvatarURL: { 
    type: String, 
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" // Default avatar
  }
}, { 
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

export default mongoose.model("User", UserSchema);