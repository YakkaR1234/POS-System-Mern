import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = require("../model/UserSchema");

const JWT_TOKEN = process.env.JWT_TOKEN;

const siginup = async (req, res) => {
  const { username, password, fullName, role } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    return res.status(400).json({ message: "User already exist", data: null });
  }

  try {
    const salt = await bycrypt.genSalt(10);
    {
      /*The salt is a random string that is used to strengthen password hashing by adding uniqueness to each hashed password,
       making it more resistant to attacks such as rainbow table attacks*/
    }
    const passwordHash = await bycrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: passwordHash,
      fullName,
      role,
      isActive: true,
    });
    newUser.save();
    res.status(200).json({ message: "User created successfully", data: null });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (!userExist) {
    return res.status(404).json({ message: "Invalid username" });
  }

  const isMatch = await bycrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const payLoad = {
    userId: userExist._id,
    username: userExist.fullName,
    role: userExist.role,
  };

  {
    /*This code creates an object named payLoad, which likely serves as data to be included in a token (e.g., JWT) or
     passed to another function*/
  }

  const token = jwt.sign(payLoad, JWT_TOKEN, { expiresIn: "2h" });
  return res
    .status(200)
    .json({ message: "Login successful", data: { token: token } });
};

module.exports = { siginup, login };
