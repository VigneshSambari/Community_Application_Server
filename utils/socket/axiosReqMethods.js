const axios = require('axios');
const config = require('config');
const {
    profileURLS
} = require('./profileURLS');

const statusOnlineSetRequest = async ({profileId}) => {
    try{
        console.log(`${config.get("CurrentURL")}profile/${profileURLS.setOnline}/${profileId}`)
        const res = await axios.get(`${config.get("CurrentURL")}${profileURLS.setOnline}${profileId}`)
        
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


const statusOfflineLastSeen = async ({profileId}) => {
    try{
        console.log(`${config.get("CurrentURL")}${profileURLS.setOfflineLastSeen}${profileId}`)
        const res = await axios.get(`${config.get("CurrentURL")}${profileURLS.setOfflineLastSeen}${profileId}`)
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