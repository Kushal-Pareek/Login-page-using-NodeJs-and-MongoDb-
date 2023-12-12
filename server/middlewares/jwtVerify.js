require("dotenv").config();
const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("authHeader", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log("token", token);

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("data", data);
        req.id = data._id;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.sendStatus(401);
    }
};

module.exports = { verifyJwt };