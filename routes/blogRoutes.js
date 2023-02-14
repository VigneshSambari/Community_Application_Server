const express = require('express');
const upload = require('../utils/multer');
const {uploadBlogMedia, deleteBlogMedia} = require('../middlewares/blogMiddleware');

const {
    updateBlog, 
    deleteBlog, 
    getOwnBlogs, 
    getAllBlogs, 
    createBlog,
    addBlogComment,
    likeOrUnlike,
    deleteCommentReply,
    replyCommentBlog
    
} = require("../controllers/blogController")

const router = express.Router();


router.get("/all", getAllBlogs);
router.get("/own", getOwnBlogs);
router.get("/:commentorpost/:id/:choice", likeOrUnlike);
router.post("/create", upload.array("file"), uploadBlogMedia, createBlog);
router.post("/delete", deleteBlogMedia, deleteBlog);
router.post("/update", upload.array("file"), deleteBlogMedia, uploadBlogMedia, updateBlog);
router.post("/comment", addBlogComment);
router.post("/deletecommentorreply", deleteCommentReply);
router.post("/addreply", replyCommentBlog);   



module.exports = router;