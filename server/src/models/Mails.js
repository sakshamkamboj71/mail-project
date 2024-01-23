import mongoose from "mongoose";

const MailSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
  subject: { type: String },
  text: { type: String },
  starred: { type: Boolean, required: true, default: false },
  bin: { type: Boolean, requried: true, default: false },
  type: { type: String, required: true },
  imgName: { type: String },
  imgUrl: { type: String },
  date: { type: String },
});

export const MailModel = mongoose.model("mails", MailSchema);
