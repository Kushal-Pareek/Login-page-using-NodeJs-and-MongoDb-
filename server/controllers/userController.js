// controllers/userController.js
const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const User = require('../models/User');


exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { firstname, middlename, lastname, password, email } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      // console.log(existingUser);
      const savedUser = await userService.createUser({ firstname, middlename, lastname, password, email });
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getUsers = async (req, res) => {
    try {
      
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
