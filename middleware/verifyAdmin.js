const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const verifyAdmin = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // to verify the token is valid
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            req.admin = await Admin.findById(decoded.adminId).select("-password");

            if (!req.admin) {
                res.status(400).json("Admin doesn't exist");
            }

            next();
        } catch (error) {
            res.status(401).json("Not authorized");
        }
    }
    if (!token) {
        res.status(401).json("Not authorized, no token");
    }
};

module.exports = { verifyAdmin };