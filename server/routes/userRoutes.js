// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validateUser');

router.post('/users',userValidator.validateUser, userController.createUser);
router.get('/users', userController.getUsers);

module.exports = router;
