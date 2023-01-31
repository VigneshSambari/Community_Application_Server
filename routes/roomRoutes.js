const express = require("express");
const {
  getRoomsController,
  createRoomController,
  joinOrLeaveRoomController,
  joinViaLinkController
} = require("../controllers/roomController");

const {authMiddleware} = require("../middlewares/auth");

const {roomMiddleware} = require("../middlewares/room");

const router = express.Router();

router.get("", getRoomsController);
router.get("/joinViaLink/:roomId", authMiddleware, joinViaLinkController);
router.post("/create", createRoomController);
router.post("/join", roomMiddleware, joinOrLeaveRoomController);
router.post("/leave", joinOrLeaveRoomController);


module.exports = router;