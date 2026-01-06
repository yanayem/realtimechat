import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "others",
    },
    avatar: { type: String, default: "" } // profile pic
  },
  { timestamps: true }
);

/* ======================
   PASSWORD HASH
====================== */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* ======================
   COMPARE PASSWORD
====================== */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
