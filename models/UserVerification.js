const mongoose = require("mongoose")

const userVerificationSchema = mongoose.Schema({
    email: {
        type: String
    },
    uniqueString: {
        type: String
    },
    createdAt: {
        type: Date 
    },
<<<<<<< HEAD
    expiresAt: {
=======
    expirtDate: {
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
        type: Date
    }
})

module.exports = mongoose.model("UserVerification", userVerificationSchema);