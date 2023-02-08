const express = require('express');
const {
    createMessage, 
    deleteMessage,
    replyMessage,
    deleteReply
} = require('../controllers/messageController');

const router = express.Router();

router.get("/delete/:messageId", deleteMessage)
router.post("/create", createMessage);
router.post("/reply", replyMessage);
router.post("/deletereply", deleteReply);


module.exports = router;