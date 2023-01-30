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
    rooms: {
      type: Array,
    },
    college: {
      type: String,
    },
    branch: {
      type: String,
    },
    professor: {
      type: Boolean,
    },
    avatar:{
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);