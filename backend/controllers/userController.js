import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ sucess: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({
        sucess: true,
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ sucess: false, message: "User Already exists" });
    }
    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        sucess: false,
        message: "Please enter a valid  email",
      });
    }
    if (password.length < 8) {
      return res.json({
        sucess: false,
        message: "Please enter a strong password",
      });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ sucess: true, token });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

//for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
