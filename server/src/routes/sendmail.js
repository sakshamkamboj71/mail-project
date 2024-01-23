import dotenv from "dotenv";
dotenv.config();

import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { from, to, subject, text, verification, imgName, imgUrl } = req.body;

  try {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (to === "") {
      return res.json({
        message: "The reciever's mail is not specified",
        error: 404,
      });
    } else if (!to.match(emailFormat)) {
      return res.json({
        message: "Please enter a valid mail",
        error: 404,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: from,
        pass: verification,
      },
    });

    const mailOptions = imgName
      ? {
          from: from,
          to: to,
          subject: subject,
          text: text,
          attachments: [
            {
              filename: imgName,
              path: imgUrl,
            },
          ],
        }
      : {
          from: from,
          to: to,
          subject: subject,
          text: text,
        };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Please check and update your App Password",
          error: 403,
        });
      } else {
        console.log("Mail sent : ", info);
        res.json({ message: "Mail sent successfully" });
      }
      console.log("working");
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: "Please check and update your App Password",
      error: 403,
    });
  }
});

export { router as sendmailRouter };
