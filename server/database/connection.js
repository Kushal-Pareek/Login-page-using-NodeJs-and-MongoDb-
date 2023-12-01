// connection.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
