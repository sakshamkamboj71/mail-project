import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { contactRouter } from "./routes/contacts.js";
import { mailRouter } from "./routes/mails.js";
import { sendmailRouter } from "./routes/sendmail.js";
import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", userRouter);
app.use("/mail", mailRouter);
app.use("/sendmail", sendmailRouter);
app.use("/contact", contactRouter);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

app.listen(8000, () => {
  console.log("listening to server 8000");
});
