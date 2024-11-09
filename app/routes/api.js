const express = require('express');
const { register } = require('../controller/register');
const { loginController } = require('../controller/checkLoginDetails');

const router = express.Router();
router.post('/login', loginController);
router.post('/register', register);

module.exports = router;





