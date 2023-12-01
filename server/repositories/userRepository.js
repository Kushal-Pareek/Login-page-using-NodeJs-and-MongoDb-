// userRepository.js
const User = require('../models/User');

exports.saveUser = async ({ fullName, email, password }) => {
    const user = new User({ fullName, email, password });
    return await user.save();
  };
exports.getAllUsers = async () => {
  return await User.find();
};
