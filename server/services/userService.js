// services/userService.js
const User = require('../models/User');
const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async ({ firstname, middlename, lastname, password, email }) => {
    try {
      const fullName = `${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = { fullName, email, password: hashedPassword };
      
      return await userRepository.saveUser(user);
    } 
    catch (error) {
      console.error('Error in createUser:', error);
      throw new Error('Error creating user');
    }
  };

exports.getAllUsers = async () => {
  try {
    return await userRepository.getAllUsers();
  } 
  catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error('Error retrieving users');
  }
};