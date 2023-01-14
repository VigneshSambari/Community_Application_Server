const mongoose = require("mongoose")

const userVerificationSchema = mongoose.Schema({
    userId: {
        type: String
    },
    uniqueString: {
        type: String
    },
    createdAt: {
        type: Date 
    },
    expirtDate: {
        type: Date
    }
})

module.exports = mongoose.model("UserVerification", userVerificationSchema);