import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  userID: { type: String, required: true },
});

export const ContactModel = mongoose.model("contacts", contactSchema);
