const express = require("express")

const {signinController, signupController, changePasswordController} = require("../controllers/userController")

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController);
router.post("/changepassword", changePasswordController)

module.exports = router;