const { verifyToken } = require('../models/user');

async function loginController(req, res) {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: 'ID token is required' });
    }

    try {
        const decodedToken = await verifyToken(idToken);
        return res.status(200).json({
            message: 'Login Successful',
            uid: decodedToken.uid,
            email: decodedToken.email
        });
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}

module.exports = { loginController };