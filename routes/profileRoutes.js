const express = require('express');
const {
    createProfile,
    fetchProfile,
    updateProfile,
    deleteProfile,
    fetchOtherProfile,
    sendConnectionRequest,
    acceptConnectionRequest,
    disconnectUser
} = require('../controllers/profileController');


const router = express.Router();

router.get("/:userId", fetchProfile);
router.get("/delete/:profileId", deleteProfile);
router.post("/create", createProfile);
router.post("/update", updateProfile);
router.post("/otherprofile", fetchOtherProfile)
router.post("/sendrequest", sendConnectionRequest);
router.post("/acceptrequest", acceptConnectionRequest);
router.post("/disconnect", disconnectUser);

module.exports = router;