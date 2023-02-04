const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    // email , username, password,rooms[],college,branch,date of creation,professor
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      default: Date.now(),
    }
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);