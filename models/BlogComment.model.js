const mongoose=require('mongoose');

const BlogComment = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    commentedBy: {
        type: String, 
    },
    commentedOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
    },
    likes: {
        type: Number,
        default: 0,
    },
    replies: [
        {
            reply: {
                type: String,
            },
            repliedBy: {
                type: String,
            }
        }
    ],

})

module.exports = mongoose.model("BlogComment", BlogComment);