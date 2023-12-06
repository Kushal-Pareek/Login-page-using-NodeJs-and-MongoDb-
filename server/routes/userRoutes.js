// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validateUser');


router.post('/register',userValidator.validateUser, userController.createUser);
router.post('/login',userValidator.validateUser, userController.loginUser);


router.get('/users', userController.getUsers);

module.exports = router;
