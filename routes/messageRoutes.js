const express = require('express');
const {
    setStatusOnline,
    setsOfflineLastseen
} = require("../controllers/messageController");

const router = express.Router();

router.get("/setonline", setStatusOnline);
router.get("/setoffline", setsOfflineLastseen);

module.exports = router;