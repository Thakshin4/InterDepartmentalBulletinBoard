const { verifyToken } = require('../config/jwt');

function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Unauthorized' });

    req.user = decoded;
    next();
}

module.exports = authMiddleware;
