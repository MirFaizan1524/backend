import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_SECRET_KEY 
});

const uploadOnCloudinary = async(localFilepath)=>{
    try{
         if(!localFilepath) return null;
         let  fileuploadResponse  = await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
         })
         console.log(fileuploadResponse.url);
         return fileuploadResponse  
    }
    catch(err){
        fs.unlinkSync(localFilepath) // removes the temporary file on server
    }

}
export {uploadOnCloudinary};
