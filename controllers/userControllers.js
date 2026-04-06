import { validationResult } from "express-validator";
import { postUser } from "../db/usersQueries.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerPost = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { firstname, lastname, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await postUser({
      firstname,
      lastname,
      password: hashedPassword,
      username,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginPost = async (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user.id, isAdmin: req.user.isAdmin },
      process.env.JWT_SECRET,
    );
     res.status(200).json({ token })
  } catch (err) {
      res.status(500).json({ message: 'Server error' })
  }
};

export { registerPost, loginPost };
