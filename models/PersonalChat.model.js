const mongoose = require("mongoose");

const PersonalChatSchema = new mongoose.Schema(
    {
        user1: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            fetchAfter: {
                type: Date,
            }
        },
        user2: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            fetchAfter: {
                type: Date,
            }
        },
        messages: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Message",
                }
            }
        ]
    }
);

module.exports = Message = mongoose.model("PersonalChatSchema", PersonalChatSchema);
