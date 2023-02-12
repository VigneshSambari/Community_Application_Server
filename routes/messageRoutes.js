const express = require('express');
const {
    deleteMessage, 
    createMessage, 
    replyMessage,
    deleteReply
} = require('../controllers/messageController');


const router = express.Router();

router.get("/delete/:messageId", deleteMessage)
router.post("/create", createMessage);
router.post("/reply", replyMessage);
router.post("/deletereply", deleteReply);


module.exports = router;