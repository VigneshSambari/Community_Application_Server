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
<<<<<<< HEAD
      unique: true,
=======
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
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
<<<<<<< HEAD
    avatar:{
      type: String,
      default: ""
    }
=======
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
