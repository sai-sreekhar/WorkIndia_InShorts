const jwt = require('jsonwebtoken');

const constants = require('../constants');

// Middleware function to verify the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'No token provided', status_code: 401 });

    jwt.verify(token, constants.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token', status_code: 403 });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
