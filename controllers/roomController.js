const {v4: uuidv4} = require("uuid");
const Profile = require("../models/Profile");
const Room = require("../models/Room");

// Get all rooms (public) (Get)
const getRoomsController = async (req, res) => {
  try {
    const allRooms = await Room.find();
    console.log("success fetching rooms");
    return res.json(allRooms);
  } catch (err) {
    res.send("internal server Error in getting rooms").status(500);
    console.log(err);
  }
};


// Create a room (Private) (Post)
const createRoomController = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      createdBy,
      tags,
    } = req.body;

    const admins = [{_id: createdBy}];

    const curRoom = {
      name,
      type,
      description,
      admins,
      createdBy,
      tags,
    };
    

    var tempRoom = new Room(curRoom);
    await tempRoom.save();
    console.log(tempRoom);

    console.log("success aading rooms");
    return res.json(tempRoom);
  } catch (err) {
    res.send("internal server Error in posting rooms").status(500);
    console.log(err);
  }
};


// Join a room (Private) (post)
const joinOrLeaveRoomController = async (req, res) => {
  const {userId, roomId, joinOrLeave} = req.body;
  try {
    console.log(userId)
    const userAdded = joinOrLeave === "join" ? 
    await Room.findByIdAndUpdate(
      {_id: roomId}, 
      {
        $addToSet: {
          users: {
            _id: userId,
          }
        }
      }
    ) : 
    await Room.findByIdAndUpdate(
      {_id: roomId}, 
      {
        $pull: {
          users: {
            _id: userId,
          }
        }
      }
    )

    console.log("success joining/leaving rooms");
    return res.json({
      "message": "Successfully joined/left room"
    });
  } catch (err) {
    res.send("internal server Error in joining rooms").status(500);
    console.log(err);
  }
};

const joinViaLinkController = async (req, res) => {
  const {roomId} = req.params;
  try {
    console.log(userId)
    const userAdded = await Room.findByIdAndUpdate(
      {_id: roomId}, 
      {
        $addToSet: {
          users: {
            _id: req.user,
          }
        }
      }
    );
    console.log(userAdded)
    console.log("success joining/leaving rooms");
    return res.json({
      "message": "Successfully joined/left room"
    });
  } catch (err) {
    res.send("internal server Error in joining rooms").status(500);
    console.log(err);
  }
}


module.exports = {
  getRoomsController,
  createRoomController,
  joinOrLeaveRoomController,
  joinViaLinkController
};