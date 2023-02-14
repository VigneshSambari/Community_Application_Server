const axios = require('axios');
const {
    profileURLS,
    roomURLS
} = require("./axiosReqURLs");

//set the status of the user to online 
const statusOnlineSetRequest = async ({userId}) => {
    try{
        
        const res = await axios.get(`${profileURLS.setOnline}${userId}`)
        return res.data
    }
    catch(err){
        
        console.log(err)
        throw {
            "_message": "Error in setting status to online!",
        }
    }
}

//set the stsus of the user to offline
const statusOfflineLastSeen = async ({userId}) => {
    try{
        const res = await axios.get(`${profileURLS.setOfflineLastSeen}${userId}`)
        return res.data
    }
    catch(err){
        console.log(err);
        throw {
            "_message": "Error in setting status to offline and last seen!",
        }
    }
}


//check if user belongs to a room
const checkMemberOfRoom = async ({roomId, userId}) => {
    try{
        const res = await axios.post(`${roomURLS.checkIfMemberOfRoom}`,
            {
                userId,
                roomId,
            }
        )
        return res.data;
    }
    catch(err){
        throw {
            "_message": "Error in checking if member of room!",
        }
    }
}

module.exports = {
    statusOnlineSetRequest,
    statusOfflineLastSeen,
    checkMemberOfRoom,
}