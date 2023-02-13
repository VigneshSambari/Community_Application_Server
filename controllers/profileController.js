const Profile = require('../models/Profile.model');
const {returnNew} = require('../utils/basicFunctions');

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
        console.log(err);
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


//update profile by userId
const updateProfile = async (req, res) => {
    try{
        const updateData = req.body;
        const finalData = await Profile.findOneAndUpdate(
            {userId: updateData.userId},
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

//delete profile by userId
const deleteProfile = async (req, res) => {
    try{
        const {userId} = req.params;
        const deletedData = await Profile.findOneAndDelete({userId});
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
        const {userIdToFetch, userIdOfRequest} = req.body;
        const fetchedProfile = await Profile.findOne(
            {
                userId: userIdToFetch,
                "connections._id": userIdOfRequest
            }
        )
        console.log(fetchedProfile);
        if(fetchedProfile){
            return res.json(fetchedProfile)
        }
        return res.json(
            {
                "_message": "Profile is private!",
            }
        );
    }
    catch(err){
        console.log(err)
        return res.json(
            {
                "_message": "Error in fetching profile!",
            }
        );
    }
}


//send connection request
const sendConnectionRequest = async (req, res) => {
    try{
        const {senderUserId, recepientUserId} = req.body;
        console.log(req.body)
        const sentRequest = await Profile.findOneAndUpdate(
            {userId: recepientUserId},
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
        const {senderUserId, recepientUserId} = req.body;
        const removed = await Profile.findOneAndUpdate(
            {userId: recepientUserId},
            {
                $pull: {
                    connectionRequests: {
                        _id: senderUserId
                    }
                },
            },
            returnNew
        )
        if(!removed) return res.json(removed);
        const connAdded = await Profile.findOneAndUpdate(
            {userId: recepientUserId},
            {
                $addToSet: {
                    connections: {
                        _id: senderUserId
                    }
                },
            },
            returnNew
        )
        return res.json(connAdded);
    }
    catch(err){
        return res.json(err);
    }
}


//disconnect from user
const disconnectUser = async (req, res) => {
    try{
        const {userId, disconnectUserId} = req.body;
        const disconnected = await Profile.findOneAndUpdate(
            {userId},
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


//to set the user status to online
const setStatusOnline = async (req, res) => {
    try{
        const {userId} = req.params;
        const setOnline = await Profile.findByIdAndUpdate(
            {userId},
            {
                online: true
            },
            returnNew
        )
        res.json(setOnline);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}

//to set the user status to offline and lastseen
const setsOfflineLastseen = async (req, res) => {
    try{
        const {userId} = req.params;
        const setOnline = await Profile.findByIdAndUpdate(
            {userId},
            {
                online: false,
                lastseen: Date()
            },
            returnNew
        )
        res.json(setOnline);
    }
    catch(err){
        console.log(err);
        res.json(err);
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
    setStatusOnline,
    setsOfflineLastseen
}