const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get the token from the header
    const token = req.header('Authorization').split(' ')[1]; // Expecting Bearer <token>

    // Check if there is no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
