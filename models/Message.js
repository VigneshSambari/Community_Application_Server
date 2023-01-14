const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    // type, content, send by, sent to, timestamp , receipt
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sendBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("Message", MessageSchema);
