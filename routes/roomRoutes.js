const express = require("express");
const {
  GetRooms,
  PostRooms,
  JoinRoom,
} = require("../controllers/roomController");
const router = express.Router();

router.post("", PostRooms);
router.post("/:id", JoinRoom);
router.get("", GetRooms);

module.exports = router;
