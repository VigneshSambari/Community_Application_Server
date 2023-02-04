const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room",
            } 
        ]
    }
);
module.exports = College = mongoose.Schema("College", CollegeSchema);