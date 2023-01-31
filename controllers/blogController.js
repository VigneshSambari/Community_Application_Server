const BlogPost = require('../models/BlogPost');
const BlogComment = require('../models/BlogComment');
const mongoose = require('mongoose');
const cloudinary = require('../cloudinaryStorage/cloudinaryBlogs');


const  getAllBlogsController = async (req, res) => {
    try{
        const allBlogs = await BlogPost.find();
        //console.log("Fetched all blogs");
        return res.json(allBlogs);
    }
    catch(err){
        //console.log("Error in fetching all blogs");
        return res.json({
            "message": "Internal server error in fetching all blogs!"
        });
    }
}


const getOwnBlogsController = async (req, res) => {

    const userId = req.user;
    //console.log(userId)

    try{
        const getOwnBlogs = await BlogPost.find({postedBy:userId});
        //console.log("Fetched user own blogs");
        return res.json(getOwnBlogs);
    }
    catch(err){
        //console.log("Error in fetchin user own blogs");
        return res.json({
            "message": "Internal Server error in fetching own user blogs"
        });
    }
}


const createBlogController = async (req,res) => {
    
    try{
        const {
            postedBy,
            title,
            body,
            coverMedia,
            like,
            comments,
            shares
        } = req.body;
    
        const newBlog = {
            postedBy,
            title,
            body,
            coverMedia,
            like,
            comments,
            shares
        }
        const blogPost = new BlogPost(newBlog);
        await blogPost.save();
        //console.log("Succesfully created blogpost");
        return res.json(blogPost);
    }
    catch(err){
        //console.log("Error in saving blogpost");
        //console.log(err);
        return res.json({
                "message" :" Internal server error in creating blog post!",
            });
    }
}


const deleteBlogController = async (req,res) => {

    const blogId = req.body._id;
    try{
        const deletedBlog = await BlogPost.findByIdAndDelete({_id: blogId});
        //console.log("Successfully deleted blog");
        return res.json(deletedBlog);
    }
    catch(err){
        //console.log('Error in deleting blog');
        //console.log(err);
        return res.json({
            "message": "Internal server error in deleting blog!"
        });
        
    }
}


const updateBlogController  = async (req, res) => {

    //console.log(req.body);
    const {
        title,
        body,
        coverMedia,
    } = req.body;

    const blogId = req.body._id;

    try{
        const updatedBlog = await BlogPost.findByIdAndUpdate(
            blogId,
            {
                title,
                body,
                coverMedia
            }
        )

        if(title) updatedBlog.title = title;
        if(body) updatedBlog.body = body;
        if(coverMedia) updatedBlog.coverMedia = coverMedia;

        //console.log("Successfully updated blog");
        return res.json(updatedBlog);
    }
    catch(err){
        //console.log("Error in updating blog!");
        return res.json({
            "message": "Internal server error in updating blog"
        })
    }
}



const addBlogCommentController = async (req, res) => {

    const commentedOn = req.body._id;
    const {
        comment, 
        commentedBy 
    } = req.body;

    try{
        const newComment = new BlogComment({
            comment,
            commentedBy,
            commentedOn,
        });

        await newComment.save();
        const addedComment = await BlogPost.findByIdAndUpdate(
            commentedOn,
            {
                $addToSet: {
                    'comments': {
                        _id: newComment._id
                    },
                }
            }
        );
        //console.log(addedComment)
        addedComment.comments.push({_id: newComment._id});
        //console.log("Successfully added comment!");
        return res.json(addedComment);
    }
    catch(err){ 
        //console.log("Error in adding comment!");
        //console.log(err);
        return res.json(err);
    }
}

//function to delete comment or reply from blog
const deleteCommentReplyController = async (req, res) => {

    //if we want to delte comment then commentOrReply = "comment
    //else "reply"
    //If we select comment then give commentOrBlogId the blogId of blog on which we are
    //deleting comment and replyOrCommentId the commentId
    //similarly for reply
    const {commentOrReply, commentOrBlogId, replyOrCommentId} = req.body;
    
    //console.log(commentOrReply, "  " ,commentOrBlogId, "  ", replyOrCommentId);
    try{
        if(commentOrReply === "comment"){
            await BlogComment.findByIdAndDelete(replyOrCommentId);
            //console.log("deleted blog comment")
        }
        const deletedCommentOrReply = commentOrReply === "comment" ? 
            await BlogPost.findByIdAndUpdate(
                {_id: commentOrBlogId},
                {
                    $pull: {
                        comments: {
                            _id: replyOrCommentId
                        }
                    }
                }
            ):
            await BlogComment.findByIdAndUpdate(
                {_id: commentOrBlogId},
                {
                    $pull: {
                        replies: {
                            _id: replyOrCommentId
                        }
                    }
                }
            );
        //console.log("deleted comment or reply from blogpost");
        return res.json(deletedCommentOrReply);
    }   
    catch(err){
        //console.log(err)
        //console.log("Error deleting comment or reply");
        return res.json(err);
    }
}

const replyCommentBlogController = async (req, res) => {
    const {reply, repliedBy, repliedOn} = req.body;
    //console.log(reply, repliedBy, repliedOn);

    try{
        const addedReply = await BlogComment.findByIdAndUpdate(
            {_id: repliedOn},
            {
                $push: {
                    replies: {
                        reply,
                        repliedBy
                    }
                }
            }
        )

        addedReply.replies.push({reply, repliedBy});
        //console.log(addedReply);
        //console.log("Successfully added comment");
        return res.json(addedReply);
    }
    catch(err){
        //console.log("Error in adding reply to comment");
        //console.log(err);
        return res.json(err);
    }
}

const likeOrUnlikeController = async (req, res) => {

    const {id, choice, commentorpost} = req.params;

    try{
        const comment = (commentorpost === "post") ? 
                await BlogPost.findById(id) : 
                await BlogComment.findById(id);

        if(choice === "like"){
            comment.likes = comment.likes + 1;
        }
        else if (choice === "dislike"){
            if(comment.likes === 0){
                return res.json({
                    "message": "Cannot unlike as likes are 0!"
                })
            }
            comment.likes = comment.likes - 1;
        }
        else{
            return res.json({
                "message": "Invalid get request!"
            });
        }

        await comment.save();
        //console.log("Successfully liked or unliked comment");
        //console.log(comment);
        return res.json(comment);
    }
    catch(err){
        //console.log("Error in liking or unliking comment");
        //console.log(err);
        return res.json(err);
    }

}




module.exports = {
    updateBlogController, 
    deleteBlogController, 
    getOwnBlogsController, 
    getAllBlogsController, 
    createBlogController,
    addBlogCommentController,
    likeOrUnlikeController,
    deleteCommentReplyController,
    replyCommentBlogController
    
}