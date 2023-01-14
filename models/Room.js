const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    // privatee , name, desc, admin[] , users[],msgs[],created at,created by ,link, tags[]
    name: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
    },
    admins: {
      type: Array,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
    messages: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tags: {
      type: Array,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Room = mongoose.model("Room", RoomSchema);

