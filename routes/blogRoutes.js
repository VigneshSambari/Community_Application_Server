const express = require('express');
const upload = require('../utils/multer');
const {uploadBlogMedia, deleteBlogMedia} = require('../middlewares/blogMiddleware');

const {
    updateBlogController, 
    deleteBlogController, 
    getOwnBlogsController, 
    getAllBlogsController, 
    createBlogController,
    addBlogCommentController,
    likeOrUnlikeController,
    deleteCommentReplyController,
    replyCommentBlogController
    
} = require("../controllers/blogController")

const router = express.Router();


router.get("/all", getAllBlogsController);
router.get("/own", getOwnBlogsController);
router.get("/:commentorpost/:id/:choice", likeOrUnlikeController);
router.post("/create", upload.array("file"), uploadBlogMedia, createBlogController);
router.post("/delete", deleteBlogMedia, deleteBlogController);
router.post("/update", upload.array("file"), deleteBlogMedia, uploadBlogMedia, updateBlogController);
router.post("/comment", addBlogCommentController);
router.post("/deletecommentorreply", deleteCommentReplyController);
router.post("/addreply", replyCommentBlogController);   



module.exports = router;