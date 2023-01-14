const express = require("express")

const {signinController, signupController, changePasswordController, sendVerificationMail, verifiedEmailController} = require("../controllers/userController")

const router = express.Router()

router.post("/login", signinController)
router.post("/register", signupController);
router.get("/verifyemail/:email/:uniqueString", sendVerificationMail);
router.post("/changepassword", changePasswordController)
router.get("/verified", verifiedEmailController)

module.exports = router;