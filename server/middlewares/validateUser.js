// validateUser.js
const { body, validationResult } = require('express-validator');

exports.validateUser = [
  body('firstname').trim().isLength({ min: 3, max: 20 }).withMessage('Firstname must be between 3 and 20 characters'),
  body('lastname').trim().isLength({ min: 3, max: 20 }).withMessage('LastName must be between 3 and 20 characters'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
