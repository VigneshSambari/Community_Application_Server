const express = require("express")

<<<<<<< HEAD
const {  
        signinController, 
        signupController, 
        changePasswordController, 
        sendVerificationMail, 
        verifiedEmailController, 
        emailVerificationController
    } = require("../controllers/userController")
=======
const {signinController, signupController, changePasswordController, sendVerificationMail, verifiedEmailController} = require("../controllers/userController")
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21

const router = express.Router()

router.post("/login", signinController)
router.post("/register", signupController);
<<<<<<< HEAD
router.get("/verifyemail/:email/:uniqueString", emailVerificationController);
router.post("/verifyemail", sendVerificationMail)
=======
router.get("/verifyemail/:email/:uniqueString", sendVerificationMail);
>>>>>>> 8d5bfd096c55756115e3a4acea7425c3eec7df21
router.post("/changepassword", changePasswordController)
router.get("/verified", verifiedEmailController)

module.exports = router;