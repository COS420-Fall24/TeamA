const express = require('express');
const { registerController } = require('../controller/register');
const { loginController } = require('../controller/login');

const router = express.Router();
router.post('/login', loginController);
router.post('/register', registerController);

module.exports = router;





