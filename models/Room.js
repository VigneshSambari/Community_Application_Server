const mongoose=require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    typeOfRoom: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    admin: [Number],
    createdBy: {
        type: String,
        required: true,
    },
    usersIdPreset: [Number],

});