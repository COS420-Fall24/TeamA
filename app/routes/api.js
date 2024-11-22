const express = require('express');
const verifyFirebaseToken = require('../middleware/auth');
const { processPrompt } = require('../controller/gemini');

const router = express.Router();

router.post('/gemini', verifyFirebaseToken, processPrompt);

module.exports = router;


