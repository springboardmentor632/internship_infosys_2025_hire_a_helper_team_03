const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('=== Auth Middleware ===');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    
    const authHeader = req.headers['authorization'];
    console.log('Auth header:', authHeader ? 'Bearer token present' : 'No auth header');
    
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified successfully');
        console.log('Decoded user ID:', decoded.userId || decoded.id);
        
        req.user = { id: decoded.userId || decoded.id }; // Handle both formats
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};