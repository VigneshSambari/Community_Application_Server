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
    replies: [
      {
        reply: {
          type: String,
          default: "", 
        },
      }
    ],
    sendBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    createdAt: {
      type: Date,
      required: true,
    }
  },
);

module.exports = Message = mongoose.model("Message", MessageSchema);
