// services/userService.js
const User = require('../models/User');
const userRepository = require('../repositories/userRepository');

exports.createUser = async ({ firstname, middlename, lastname, email }) => {
  try {
    const fullName = `${firstname} ${middlename ? middlename + ' ' : ''}${lastname}`;

    const user = { fullName, email };
    
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