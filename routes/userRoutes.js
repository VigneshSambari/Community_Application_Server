const express = require("express")

const {signinController, signupController, changePasswordController} = require("../controllers/userController")

const router = express.Router()

router.post("/login", signinController)
router.post("/register", signupController);
router.post("/changepassword", changePasswordController)

module.exports = router;