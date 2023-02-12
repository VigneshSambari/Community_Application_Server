const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    rooms: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        fetchAfter: {
          type: Date,
        }
      }
    ],
    college: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: ""
    },
    online: {
      type: Boolean,
      default: false,
    },
    lastseen: {
      type: Date,
      default: Date(),
    },
    connections: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      }
    ],
    connectionRequests: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      }
    ],
    blogs: [
      {
        _id:{
          type:  mongoose.Schema.Types.ObjectId,
          ref: "BlogPost",
        }
      }
    ],
    links: [
      {
        _id: {
          type: String,
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);