const cloudinary = require ('cloudinary').v2;
const { Console } = require('console');
const fs = require('fs');
const BlogPost = require('../models/BlogPost');

const uploadBlogMedia = async (req, res) => {

    console.log("inside uploadBlogMedia middleware");
    const {postedBy} = req.body;
    const blogId = req.body._id;
    console.log(req.body)
    const files = req.files;
    var fileItr = 0;
    try{
              
        if(files.length == 0){
            next();
        }
        
        for(fileItr=0; fileItr<files.length; fileItr++){
            const {path} = files[fileItr];
            const uploadedFileDetails = await cloudinary.uploader.upload(path,
                {
                    resource_type: "auto",
                    folder: `communityapplication/${postedBy}`,
                }
            );

            console.log(req.body.coverMedia[fileItr]._id)
                
            const currFileDetails = await BlogPost.findByIdAndUpdate({_id: blogId, "coverMedia._id": req.body.coverMedia[fileItr]._id}, 
            {
                '$set': {
                    // "coverMedia.$.type": req.body.coverMedia[fileItr].type,
                    // "coverMedia.$.url": uploadedFileDetails.secure_url,
                    // "coverMedia.$.publicId": uploadedFileDetails.public_id
                    // "coverMedia":{
                    //     _id:  req.body.coverMedia[fileItr]._id,
                    //     type: req.body.coverMedia[fileItr].type,
                    //     url: uploadedFileDetails.secure_url,
                    //     publicId: uploadedFileDetails.public_id
                    // }
                }
                
            })

            console.log(currFileDetails);  
            req.body.coverMedia[fileItr].url= uploadedFileDetails.secure_url;
            req.body.coverMedia[fileItr].publicId= uploadedFileDetails.public_id; 

            fs.unlinkSync(path);
       }

        console.log("Uploaded all images")
        // const result = await cloudinary.uploader.upload(req.file.path,
        //     {
                
        //     }
        // );
        // req.body.coverMedia.link  = result.secure_url;
        // req.body.coverMedia.publicId = result.public_id;

        return res.json({
            "_message": "Succesfully uploaded all blog images"
        });
    }
    catch(err){
        console.log("Error in uploading media blog middleware");
        console.log(err);

        for(; fileItr>=0; fileItr--){

        }

        return res.json(err)
    }
 
          
}



const deleteBlogMedia = async (req, res, next) => {
    console.log("inside deleteBlogMedia middleware");
    try{
        const {deletePublicIds} = req.body;
        if(deletePublicIds.length == 0){
            next();
        }
        
        console.log(deletePublicIds);
        for(var i=0;i<deletePublicIds.length;i++){
            await cloudinary.uploader.destroy(deletePublicIds[i]);
        }
        
        console.log("Successfully deleted images from cloudinary")
        next();
    }
    catch(err){
        console.log("Error in deleting image middleware");
        res.json(err);
    }

}

module.exports= {
    uploadBlogMedia,
    deleteBlogMedia
}