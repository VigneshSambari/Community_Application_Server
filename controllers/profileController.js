const Profile = require('../models/Profile.model');
const mongoose = require("mongoose");

const returnNew = {
    new: true
}

//Create profile
const createProfile = async (req, res) => {
    try{
        const {
            userId, 
            userName, 
            college, 
            specialization, 
            designation, 
            avatar
        } = req.body;

        const userNameExists = await Profile.findOne({userName});

        if(userNameExists){
            return res.json({
                "_message": "UserName is already taken!"
            })
        }

        const newProfile = {
            userId, 
            userName, 
            college, 
            specialization, 
            designation, 
            avatar,
        }

        const profileCreated = new Profile(newProfile);
        await profileCreated.save();
        return res.json(profileCreated);
    }
    catch(err){
        console.log("Error in creating profile");
        return res.json({
            "_message": "Error in creating profile!",
        })
    }
}

//fetch user profile by userId
const fetchProfile = async (req, res) => {
    try{
        const {userId} = req.params;
        const profile = await Profile.findOne({userId});
        console.log(profile)
        return res.json(profile);
    }
    catch(err){
        console.log("Error in fetching profile");
        return res.json(err);
    }
}


//update profile by profileId
const updateProfile = async (req, res) => {
    try{
        const updateData = req.body;
        const finalData = await Profile.findOneAndUpdate(
            {_id: updateData._id},
            updateData,
            returnNew,
        )
        res.json(finalData);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}

//delete profile by profileId
const deleteProfile = async (req, res) => {
    try{
        const {profileId} = req.params;
        const deletedData = await Profile.findOneAndDelete({_id: profileId});
        console.log(deletedData);
        return res.json(deletedData);
    }
    catch(err){
        console.log(err);
        return res.json(err);
    }
}

//get others profile
const fetchOtherProfile = async (req, res) => {
    try{
        const {profileIdToFetch, userIdOfRequest} = req.body;
        const isFriend = await Profile.findOne({
            $and: [
                {_id: profileIdToFetch},
                {
                    connections: {
                        $elemMatch: {
                            _id: userIdOfRequest
                        }
                    }
                }
            ]
        })
        console.log(isFriend);
        if(isFriend){
            //return res.json({"_message": "File exists!"})
        }
        return res.json(isFriend);
    }
    catch(err){
        console.log(err)
        return res.json(err);
    }
}

//send connection request
const sendConnectionRequest = async (req, res) => {
    try{
        const {senderUserId, recepientProfileId} = req.body;
        const sentRequest = await Profile.findOneAndUpdate(
            {_id: recepientProfileId},
            {
                $addToSet: {
                    connectionRequests: {
                        _id: senderUserId
                    }
                }
            },
            returnNew
        )
        return res.json(sentRequest);
    }
    catch(err){
        return res.json(err);
    }
}

//accept connection request
const acceptConnectionRequest = async (req, res) => {
    try{
        const {senderUserId, recepientProfileId} = req.body;
        const removed = await Profile.findOneAndUpdate(
            {_id: recepientProfileId},
            {
                $pull: {
                    connectionRequests: {
                        _id: senderUserId
                    }
                },
                $addToSet: {
                    connections: {
                        _id: senderUserId
                    }
                },
            },
            returnNew
        )
        return res.json(removed);
    }
    catch(err){
        return res.json(err);
    }
}


//disconnect from user
const disconnectUser = async (req, res) => {
    try{
        const {profileId, disconnectUserId} = req.body;
        const disconnected = await Profile.findOneAndUpdate(
            {_id: profileId},
            {
                $pull: {
                    connections: {
                        _id: disconnectUserId
                    }
                },
            },
            returnNew
        )
        return res.json(disconnected);
    }
    catch(err){
        return res.json(err);
    }
}

module.exports = {
    createProfile,
    fetchProfile,
    updateProfile,
    deleteProfile,
    fetchOtherProfile,
    sendConnectionRequest,
    acceptConnectionRequest,
    disconnectUser,
}