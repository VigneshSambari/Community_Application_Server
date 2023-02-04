const express = require("express");
const {
  getRoomsController,
  createRoomController,
  joinOrLeaveRoomController,
  joinViaLinkController
} = require("../controllers/roomController")

const {authMiddleware} = require("../middlewares/authMiddleware");

const {roomMiddleware} = require("../middlewares/roomMiddleware");

const router = express.Router();

router.get("", getRoomsController);
router.get("/joinViaLink/:roomId", authMiddleware, joinViaLinkController);
router.post("/create", createRoomController);
router.post("/join", roomMiddleware, joinOrLeaveRoomController);
router.post("/leave", joinOrLeaveRoomController);


module.exports = router;