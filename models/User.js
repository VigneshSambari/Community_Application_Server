const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // email , username, password, rooms[] , college,branch,date of creation,professor
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
<<<<<<< HEAD
=======
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
  },
  { timestamps: true }
);

module.exports = Users = mongoose.model("users", UserSchema);
