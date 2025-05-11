const express = require('express');
const { chat, resetSession, getChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', chat);
router.get("/:sessionId", getChat);
router.delete('/:sessionId', resetSession);

module.exports = router;
