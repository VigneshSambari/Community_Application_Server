const {v4: uuidv4} = require("uuid");
const Profile = require("../models/Profile.model");
const Room = require("../models/Room.model");

// Get all rooms (public) (Get)
const getRooms = async (req, res) => {
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
const createRoom = async (req, res) => {
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


//function to add user to group
const findAndAdd = async ({userId, roomId, roomCreatedAt}) => {
  try{
    await Room.findByIdAndUpdate(
      {_id: roomId}, 
      {
        $addToSet: {
          users: {
            _id: userId,
          }
        }
      }
    );

    await Profile.findByIdAndUpdate(
      {userId},
      {
        $addToSet: {
          rooms: {
            _id: roomId,
            fetchAfter: roomCreatedAt
          }
        }
      }
    )
  }
  catch(err){
    console.log(err);
    throw err;
  }
}


//function to remove user from group
const findAndRemove = async ({userId, roomId}) => {
  try{
    await Room.findByIdAndUpdate(
      {_id: roomId}, 
      {
        $pull: {
          users: {
            _id: userId,
          }
        }
      }
    );

    await Profile.findByIdAndUpdate(
      {userId},
      {
        $pull: {
           rooms: {
            _id: roomId,
           }
        }
      }
    )
  }
  catch(err){
    console.log(err);
    throw err;
  }
}


// Join a room (Private) (post)
const joinOrLeaveRoom = async (req, res) => {
  const {userId, roomId, joinOrLeave, roomCreatedAt} = req.body;
  try {
    console.log(userId)
    const userAdded = joinOrLeave === "join" 
    ? await findAndAdd({userId, roomId, roomCreatedAt})
    : await findAndRemove({userId, roomId}); 
    

    console.log("success joining/leaving rooms");
    return res.json({
      "_message": "Successfully joined/left room"
    });
  } catch (err) {
    res.send("internal server Error in joining rooms").status(500);
    console.log(err);
  }
};

//join via link route by roomId
const joinViaLink = async (req, res) => {
  const {roomId} = req.params;
  try {
    const roomDetails = await Room.findById({_id: roomId});
    // const userAdded = await Room.findByIdAndUpdate(
    //   {_id: roomId}, 
    //   {
    //     $addToSet: {
    //       users: {
    //         _id: req.user,
    //       }
    //     }
    //   }
    // );
    const userAdded = await findAndAdd(
      {
        userId: req.user, 
        roomId: req.params.roomId, 
        createdAt: roomDetails.createdAt
      }
    );
    console.log(userAdded)
    console.log("success joining/leaving rooms");
    return res.json({
      "_message": "Successfully joined/left room"
    });
  } catch (err) {
    res.send("internal server Error in joining rooms").status(500);
    console.log(err);
  }
}


//check is a user belongs to the given room
const checkIfMember = async (req, res) => {
  try{
    const {userId, roomId} = req.body;
    const fetchedRoom = await Room.findOne(
      {
        _id: roomId,
        $or: [
          {"users._id": userId},
          {"admins._id": userId}
        ]
      }
    )
    return res.json(fetchedRoom);
  }
  catch(err){
    console.log(err);
    return res.json(
      {
        "message": "Error in checking if memeber of room!",
      }
    )
  }
}


module.exports = {
  getRooms,
  createRoom,
  checkIfMember,
  joinOrLeaveRoom,
  joinViaLink
};