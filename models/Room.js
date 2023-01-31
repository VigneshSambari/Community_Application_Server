const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    // privatee , name, desc, admin[] , users[],msgs[],created at,created by ,link, tags[]
    name: {
      type: String,
      required: true,
    },
    groupIcon: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    admins: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      }
    ],
    users: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        }
      }
    ],
    requests: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        }
      }
    ],
    messages: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
          required: true,
        }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tags: [
      {
        tag: {
          type: String,
        }
      }

    ],
  },
  { timestamps: true }
);

module.exports = Room = mongoose.model("Room", RoomSchema);

