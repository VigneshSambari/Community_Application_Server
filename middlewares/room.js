const Room = require("../models/Room");

const room = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const curRoom = await Room.findById(roomId);

    if (!curRoom.private) {
      next();
    }
    //  private room logic
  } catch (err) {
    console.log("err in room middleware ");
    return res.status(401).json({ msg: "No access to this room " });
  }
};

module.exports = room;
