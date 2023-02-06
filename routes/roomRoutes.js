const express = require("express");
const {
  getRooms,
  createRoom,
  joinOrLeaveRoom,
  joinViaLink
} = require("../controllers/roomController")

const {authMiddleware} = require("../middlewares/authMiddleware");

const {roomMiddleware} = require("../middlewares/roomMiddleware");

const router = express.Router();

router.get("", getRooms);
router.get("/joinViaLink/:roomId", authMiddleware, joinViaLink);
router.post("/create", createRoom);
router.post("/join", roomMiddleware, joinOrLeaveRoom);
router.post("/leave", joinOrLeaveRoom);


module.exports = router;