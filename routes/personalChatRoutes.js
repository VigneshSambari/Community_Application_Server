const express = require('express');
const { 
    createChat, 
    textUser, 
    deleteChat 
} = require('../controllers/personalChatController');

const router = express.Router();

router.post("", createChat);
router.post("/chat", textUser);
router.post("/delete", deleteChat)

module.exports = router;