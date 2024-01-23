import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const plen = password.length;

  const user = await UserModel.findOne({ email });
  const usernameExist = await UserModel.findOne({ username });

  if (usernameExist) {
    return res.json({ message: "The username already exists", code: "403" });
  } else if (user) {
    return res.json({ message: "This Mail already exists", code: "403" });
  } else if (username.length < 3) {
    return res.json({
      message: "Username can't be less than 3 characters",
      code: "ul",
    });
  } else if (plen < 8 || plen > 16) {
    return res.json({
      message: "Password must be 8-16 characters long",
      code: "pl",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "The mail entered does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      message: "Username or Password you entered is Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

router.post("/get-user", async (req, res) => {
  const { userID } = req.body;

  const user = await UserModel.findOne({ _id: userID });

  res.json(user);
});

router.post("/update-user", async (req, res) => {
  try {
    const { userID, updusername } = req.body;

    const usernameExist = await UserModel.findOne({ username: updusername });

    if (usernameExist) {
      res.json({ message: "Username already exists", code: 402 });
      throw "Error Error";
    }

    const user = await UserModel.findByIdAndUpdate(
      { _id: userID },
      { username: updusername },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/update-pass", async (req, res) => {
  const { userID, oldpass, newpass, confirmpass } = req.body;

  const user = await UserModel.findOne({ _id: userID });

  const isPasswordValid = await bcrypt.compare(oldpass, user.password);

  const newlen = newpass.length;

  if (oldpass === "" || newpass === "" || confirmpass === "") {
    return res.json({
      message: "Please fill out all the fields",
    });
  } else if (!isPasswordValid) {
    return res.json({
      message: "Old Password does not match",
    });
  } else if (newpass != confirmpass) {
    return res.json({
      message: "Newly entered passwords do not match",
    });
  } else if (newlen < 8 || newlen > 16) {
    return res.json({
      message: "New password length must be between 8-16 characters",
    });
  } else if (oldpass === newpass) {
    return res.json({
      message: "New password cannot be the same as old password",
    });
  }

  const newHashPass = await bcrypt.hash(newpass, 10);

  const newUser = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { password: newHashPass },
    { new: true }
  );

  res.json({ status: "successful" });
});

router.post("/update-phone", async (req, res) => {
  const { userID, updphone } = req.body;

  const updatedphone = Number(updphone);

  const user = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { phone: updatedphone },
    { new: true }
  );

  res.json(user);
});

router.post("/update-pic", async (req, res) => {
  const { userID, updpic } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { pic: updpic },
    { new: true }
  );

  res.json(user);
});

router.post("/update-age", async (req, res) => {
  const { userID, age } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { age: age },
    { new: true }
  );

  res.json(user);
});

router.post("/verify", async (req, res) => {
  const { userID, verification } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    { _id: userID },
    { verification: verification },
    { new: true }
  );

  res.json({ message: "Successfully updated" });
});

export { router as userRouter };
