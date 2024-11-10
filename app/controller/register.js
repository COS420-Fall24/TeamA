const { createUser } = require('../models/user');

async function registerController(req, res) {
    const { email, password } = req.body;
    
    try {
        const userRecord = await createUser(email, password)

        res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
    } catch (error) {
        switch (error.code) {
            case 'auth/email-already-exists':
                res.status(400).json({ error: 'The email address is already in use by another account.' });
                break;
            case 'auth/invalid-email':
                res.status(400).json({ error: 'The email address is invalid.' });
                break;
            case 'auth/weak-password':
                res.status(400).json({ error: 'The password is too weak.' });
                break;
            default:
                res.status(500).json({ error: 'An error occurred during registration.' });
        }
    }
}

module.exports = { registerController };
