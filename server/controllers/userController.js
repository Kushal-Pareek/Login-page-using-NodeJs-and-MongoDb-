// controllers/userController.js
const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
      const { firstname, middlename, lastname, password, email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
     
      const savedUser = await userService.createUser({ firstname, middlename, lastname, password, email });
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  // login user
  exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    console.log("validPassword",validPassword);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
     
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
    console.log("User Login Successfully");
  };


exports.getUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      console.log("----------->", users)
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  