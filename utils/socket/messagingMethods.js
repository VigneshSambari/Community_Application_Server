const axios = require('axios');
const config = require('config');

const statusOnlineSetRequest = async ({profileId}) => {
    try{
        const res = await axios.get(`${config.get("CurrentURL")}`)
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    setStatusOnline,
}