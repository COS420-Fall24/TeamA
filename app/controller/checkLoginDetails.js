const { checkLoginDetails } = require('../models/user');

async function loginController(req, res){
    const {email, password} =req.body;

    if (!email || !password) {
        return res.status(400).json({ messgae: 'Email and password are required'});

    }

    try {
        const loginResult = await checkLoginDetails(email, password);

        if (loginResult.success){

            return res.status(200).json({
                message: 'Login Successful',
                uid: loginResult.uid,
                email: loginResult.email,
            });

        } else{
            return res.status(401).json({ message: 'Either email or password is incorrect'});
        }
    } catch (error){
        console.error('Unexpected error during login:', error);
        return res.status(500).json({message: 'An error occurred during login'})
    }
}
module.exports = {loginController}