const express = require('express');
const verifyFirebaseToken = require('../middleware/auth');
const { getSampleText } = require('../controller/openai');

const router = express.Router();

router.post('/openai', verifyFirebaseToken, getSampleText);

module.exports = router;





