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
        },
        repliedBy: {
          type: String,
        },
        time: {
          type: Date,
        }
      }
    ],
    sentBy: {
      type: String,
    },
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {timestamps: true}
);

module.exports = Message = mongoose.model("Message", MessageSchema);
