import express from "express";
import { MailModel } from "../models/Mails.js";

const router = express.Router();

router.post("/compose", async (req, res) => {
  const {
    userID,
    to,
    from,
    subject,
    text,
    starred,
    bin,
    type,
    imgName,
    imgUrl,
    date,
  } = req.body;

  var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (to === "") {
    return res.json({
      message: "The reciever's mail is not specified",
      error: "404",
    });
  } else if (!to.match(emailFormat)) {
    return res.json({
      message: "You have entered an invalid mail",
      error: "403",
    });
  }

  const mail = new MailModel({
    userID,
    to,
    from,
    subject,
    text,
    starred,
    bin,
    type,
    imgName,
    imgUrl,
    date,
  });

  await mail.save();
  res.json({ message: "Mail Sent Successfully" });
});

router.post("/all", async (req, res) => {
  try {
    const { userID } = req.body;

    const mails = await MailModel.find({ userID: { $in: [userID] } });

    res.json(mails);
  } catch (err) {
    console.log(err);
  }
});

router.post("/star-mails", async (req, res) => {
  const { userID } = req.body;

  const mails = await MailModel.find({
    userID: { $in: [userID] },
    starred: true,
    bin: false,
  });

  res.json(mails);
});

router.post("/sent-mails", async (req, res) => {
  const { userID } = req.body;

  const mails = await MailModel.find({
    userID: { $in: [userID] },
    type: "sent",
    bin: false,
  });

  res.json(mails);
});

router.post("/bin-mails", async (req, res) => {
  const { userID } = req.body;

  const mails = await MailModel.find({
    userID: { $in: [userID] },
    bin: true,
  });

  res.json(mails);
});

router.post("/draft-mails", async (req, res) => {
  const { userID } = req.body;

  const mails = await MailModel.find({
    userID: { $in: [userID] },
    type: "draft",
    bin: false,
  });

  res.json(mails);
});

router.post("/single", async (req, res) => {
  try {
    const { mailID } = req.body;

    const mail = await MailModel.find({ _id: mailID });

    res.json(mail);
  } catch (err) {
    console.log(err);
  }
});

router.post("/star", async (req, res) => {
  try {
    const { star, mailID } = req.body;

    await MailModel.findByIdAndUpdate(
      { _id: mailID },
      { starred: star },
      { new: true }
    );

    res.json({ message: "Starred successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/bin", async (req, res) => {
  try {
    const { binval, mailID } = req.body;

    await MailModel.findByIdAndUpdate(
      { _id: mailID },
      { bin: binval },
      { new: true }
    );

    res.json({ message: "Sent to bin successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { binval, mailID } = req.body;

    await MailModel.findByIdAndDelete({ _id: mailID });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});

export { router as mailRouter };
