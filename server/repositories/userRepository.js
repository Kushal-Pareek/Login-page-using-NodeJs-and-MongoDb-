// userRepository.js
const User = require('../models/User');

exports.saveUser = async ({ fullName, email }) => {
  
  const user = new User({ fullName, email });

  return await user.save();
};

exports.getAllUsers = async () => {
  return await User.find();
};
