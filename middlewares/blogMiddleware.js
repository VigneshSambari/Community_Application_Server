const cloudinary = require ('cloudinary').v2;
const { Console } = require('console');
const fs = require('fs');

const uploadBlogMedia = async (req, res, next) => {
    console.log("inside uploadBlogMedia middleware");
    try{
        const {postedBy} = req.body;
        
        const files = req.files;

        if(files.length == 0){
            next();
        }

        req.body.coverMedia = [];
        for(const file of files){
            const {path} = file;
            const uploadedFileDetails = await cloudinary.uploader.upload(path,
                {
                    resource_type: "auto",
                    folder: `communityapplication/${postedBy}`,
                }
            );
            req.body.coverMedia.push({
                url: uploadedFileDetails.secure_url,
                publicId: uploadedFileDetails.public_id
            });
            fs.unlinkSync(path);
        }

        console.log("Uploaded all images")
        // const result = await cloudinary.uploader.upload(req.file.path,
        //     {
                
        //     }
        // );
        // req.body.coverMedia.link  = result.secure_url;
        // req.body.coverMedia.publicId = result.public_id;

        next();
    }
    catch(err){
        console.log("Error in uploading media blog middleware");
        console.log(err);
        res.json(err)
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