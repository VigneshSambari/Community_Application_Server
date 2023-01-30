// const { rmSync } = require("fs");
const Profile = require("../models/Profile");
const Room = require("../models/Room");
const User = require("../models/User");

// Get all rooms (public) (Get)
const GetRooms = async (req, res) => {
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
const PostRooms = async (req, res) => {
  try {
    const {
      name,
      description,
      users,
      admins,
      messages,
      createdBy,
      tags,
      private,
    } = req.body;

    const curRoom = {
      name,
      description,
      users,
      admins,
      messages,
      createdBy,
      tags,
      private,
    };
    const tempRoom = new Room(curRoom);
    await tempRoom.save();
    console.log("success aading rooms");
    return res.json(tempRoom);
  } catch (err) {
    res.send("internal server Error in posting rooms").status(500);
    console.log(err);
  }
};

// Join a room (Private) (post)
const JoinRoom = async (req, res) => {
  try {
    const userId = req.user;
    const roomId = req.params.id;

    const curRoom = await Room.findById(roomId);
    curRoom.users.append(userId);
    await curRoom.save();

    const curProfile = await Profile.find({ user: userId });
    curProfile.rooms.append(roomId);
    await curProfile.save();

    console.log("success joining rooms");
    return res.json(curRoom);
  } catch (err) {
    res.send("internal server Error in joining rooms").status(500);
    console.log(err);
  }
};

module.exports = {
  GetRooms,
  PostRooms,
  JoinRoom,
};