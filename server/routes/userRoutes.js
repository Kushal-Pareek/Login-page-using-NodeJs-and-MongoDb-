// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/validateUser');
const User = require("../models/User");
const { verifyJwt } = require("../middlewares/jwtVerify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post('/register', userValidator.validateUser, userController.createUser);



router.post('/login', async (req, res) => {
    try {

        console.log("req.body--->", req.body);
        const user = await User.findOne({ email: req.body.email });
        console.log("user--->", user);
        console.log("req.body.password--->", req.body.password);
        console.log(typeof req.body.password);
        const password = req.body.password.toString();

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid details' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        console.log("token--->", token);
        res.json({ token, email: user.email });
    } catch (error) {
        console.log("error--------->", error);
        res.status(500).json({ error: 'Error logging in' });
    }
});



router.get('/verifyToken', verifyJwt, (req, res) => {
    User.findById(req.id)
        .then(user => res.json({ fullName: user.fullName, email: user.email }))
        .catch(err => res.status(500).json({ error: 'Error verifying token' }));
});

module.exports = router;
