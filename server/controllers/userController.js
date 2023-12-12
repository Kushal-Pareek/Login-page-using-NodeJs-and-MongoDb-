// controllers/userController.js
const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// create user
exports.createUser = async (req, res) => {
  try {
    const { firstname, middlename, lastname, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    // console.log(existingUser);
    const savedUser = await userService.createUser({
      firstname,
      middlename,
      lastname,
      password,
      email,
    });
    console.log(savedUser);
    const data = { _id: savedUser.id };
    console.log("data", data);
    const authToken = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JET_LIFETIME,
    });
    res.status(201).json({ savedUser, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    // console.log("----------->", users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
