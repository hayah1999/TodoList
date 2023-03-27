const jwt = require('jsonwebtoken');
const user = require('../models/user');

const verifyAuth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({
                code: res.statusCode,
                message: "Not authorized, no token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await user.findById(decoded.userId);
        if (!req.user) {
            res.status(400);
            throw new Error("User doesn't exist");
        }
        next();

    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

module.exports = { verifyAuth };