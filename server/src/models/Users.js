import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verification: { type: String },
  age: { type: Number },
  phone: { type: Number },
  pic: { type: String },
});

export const UserModel = mongoose.model("users", UserSchema);
