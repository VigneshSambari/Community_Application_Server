const Room = require("../models/Room");

const roomMiddleware = async (req, res, next) => {
  try {
    const {roomId, userId} = req.body;
    const currRoom = await Room.findById(roomId);

    if (currRoom.type == "public") { 
      next();
    }
    else if(currRoom.type == "private"){
      const requestSent = await Room.findByIdAndUpdate({_id: roomId}, 
        {
          $addToSet: {
            requests: {
              _id: userId,
            }
          }
        }
      ) 
      return res.json({
        "message": "Join request sent!", 
      })
    }
    //  private room logic
  } catch (err) {
    return res.json(err);
  }
};

module.exports = {
  roomMiddleware
}; 