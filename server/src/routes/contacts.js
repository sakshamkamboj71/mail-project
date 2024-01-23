import express from "express";
import { ContactModel } from "../models/Contacts.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { nickname, email, userID } = req.body;

  // console.log(!email.match(emailFormat));

  try {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email === "") {
      return res.json({
        message: "The reciever's mail is not specified",
        error: 404,
      });
    }

    const newContact = new ContactModel({
      nickname,
      email,
      userID,
    });

    await newContact.save();
    res.json({ message: "Contact Successfully Registered" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error Occured" });
  }
});

router.post("/all", async (req, res) => {
  try {
    const { userID } = req.body;
    const contacts = await ContactModel.find({ userID: { $in: [userID] } });
    res.json(contacts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/del", async (req, res) => {
  try {
    const { _id } = req.body;
    await ContactModel.findByIdAndDelete({ _id: _id });
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error in deletion" });
  }
});

export { router as contactRouter };
