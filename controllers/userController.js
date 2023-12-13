const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// POST register user  /api/users/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ Error: "All fields are mandatory" });
  }
  // check for is email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ Error: "User Already Exists with this email" });
  }

  // generate hashPassword using bcryptjs
  const hashPassword = await bcrypt.hash(password, 10);

  // creating new user and save it
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log(user.username);
  res.status(201).json(user);
};

// POST register user  /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ Error: "All fields are required" });
  }

  // check if is it user already exists there
  const existsUser = await User.findOne({ email });
  if (!existsUser) {
    res.status(400).json(" User is not registered, Please register first");
  }

  // verify password using bcryptjs
  if (existsUser && (await bcrypt.compare(password, existsUser.password))) {
    // check username && userId
    console.log(`username:${existsUser.username},id:${existsUser.id}`);
    // generate jwtToken
    const jwtToken = jwt.sign(
      {
        user: {
          username: existsUser.username,
          email: existsUser.email,
          id: existsUser.id,
        },
      },
      process.env.JWT_KEY,
      { expiresIn: "5m" }
    );

    res.status(200).json({ jwtToken });
  } else {
    res.status(401).json({Error:"Email or password is not valid"});
  }
};

// GET get current user   /api/users/currentuser
const currentUser = async (req, res) => {
  const currentUser = req.user;
  res.status(200).json({ currentUser });
};

// PATCH get current user   /api/users/forgetpassword
const forgetpassword = async (req, res) => {
  try {
    const email = req.user.email;
    const newPassword = req.body.password;
    if (!newPassword) {
        res.status(400).json({ Error: "new password not found" });
    }
    // generate hash of new password using bcryprjs  
    const hashedPassword = await bcrypt.hash(newPassword,10);
    console.log("hash",hashedPassword)

    const user = await User.findOneAndUpdate({ email }, {password:hashedPassword}, {
      new: true,
    });
    console.log(user);
    if (user) {
      res.status(201).json({ message: "password updated successfully" });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Couldn't forget password");
  }
};

// DELETE get current user   /api/users/deleteuser
const deleteUser = async (req, res) => {
  const email = req.user.email;
  const user = await User.findOneAndDelete({email});
  if(user){
      res.status(200).json({message:"User deleted successfully"});
  }else{
      res.status(400).json({Error:"Couldn't delete user"});
  }
};

module.exports = {
  currentUser,
  deleteUser,
  forgetpassword,
  registerUser,
  loginUser,
};
