const express = require('express');
const {
    createProfile,
    fetchProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profileController');


const router = express.Router();

router.get("/:userId", fetchProfile);
router.get("/delete/:profileId", deleteProfile);
router.post("/create", createProfile);
router.post("/update", updateProfile);

module.exports = router;