const Message = require('../models/Message.model');

const requestNew = {
    new: true,
}

//create message from model
const createMessage = async (req, res) => {
    try{
        const {
            sentBy,
            sentTo,
            type,
            content,
        } = req.body;

        const newMessage = {
            sentBy,
            sentTo,
            type,
            content,
        }

        const messagecreated = new Message(newMessage);
        await messagecreated.save();
        return res.json(messagecreated);
    }
    catch(err){
        return res.json(err);
    }
}


//delete message
const deleteMessage = async (req, res) => {
    try{
        const {messageId} = req.params;
        await Message.findByIdAndDelete({_id: messageId});
    }
    catch(err){
        return res.json(err);
    }
}


//reply to message by messageID
const replyMessage = async (req, res) => {
    try{
        const {messageId, repliedBy, reply} = req.body;
        const repliedMsg = await Message.findByIdAndUpdate(
            {_id: messageId},
            {
                $push: {
                    replies: {
                        reply,
                        repliedBy,
                        time: Date(),
                    }
                }
            },
            requestNew,
        );
        return res.json(repliedMsg); 
    }
    catch(err){
        return res.json(err);
    }
}


//delete reply by messageId and replyId
const deleteReply = async (req, res) => {
    try{
        const {messageId, replyId} = req.body;
        const deletedReply = await Message.findByIdAndUpdate(
            {_id: messageId},
            {
                $pull: {
                    replies: {
                        _id: replyId,
                    }
                }
            },
            requestNew,
        );
        return res.json(deletedReply); 
    }
    catch(err){
        return res.json(err);
    }
}


const sendMessage = async (req, res) => {
    try{

    }
    catch(err){

    }
}


module.exports = {
    createMessage,
    deleteMessage,
    replyMessage,
    deleteReply,
    sendMessage
}