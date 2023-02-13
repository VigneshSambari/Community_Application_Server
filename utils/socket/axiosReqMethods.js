const axios = require('axios');
const config = require('config');
const {
    profileURLS
} = require("./axiosReqURLs");

const statusOnlineSetRequest = async ({userId}) => {
    try{
        console.log(`${config.get("CurrentURL")}profile/${profileURLS.setOnline}/${userId}`)
        const res = await axios.get(`${config.get("CurrentURL")}${profileURLS.setOnline}${userId}`)
        
        console.log(res.data);
        return res.data
    }
    catch(err){
        
        console.log(err)
        throw {
            "_message": "Error in setting status to online!",
        }
    }
}


const statusOfflineLastSeen = async ({userId}) => {
    try{
        console.log(`${config.get("CurrentURL")}${profileURLS.setOfflineLastSeen}${userId}`)
        const res = await axios.get(`${config.get("CurrentURL")}${profileURLS.setOfflineLastSeen}${userId}`)
        console.log(res.data)
        return res.data
    }
    catch(err){
        console.log(err);
        throw {
            "_message": "Error in setting status to offline and last seen!",
        }
    }
}


module.exports = {
    statusOnlineSetRequest,
    statusOfflineLastSeen,
}