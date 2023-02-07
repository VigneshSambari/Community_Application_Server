const Profile = require('../models/Profile.model');



const setStatusOnline = async (req, res) => {
    try{
        const {profileId} = req.params;
        const setOnline = await Profile.findByIdAndUpdate(
            {_id: profileId},
            {
                online: true
            }
        )
        res.json(setOnline);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}


const setsOfflineLastseen = async (req, res) => {
    try{
        const {profileId} = req.params;
        const setOnline = await Profile.findByIdAndUpdate(
            {_id: profileId},
            {
                online: true
            }
        )
        res.json(setOnline);
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}


module.exports = {
    setStatusOnline,
    setsOfflineLastseen
}