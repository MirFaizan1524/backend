import { asyncHandler } from "../utils/asyncHander.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
    //    res.status(200).json({
    //     message:"registration done"
    //    })
    const { username,email,fullName,password} = await req.body;

    if (!username) {
        console.log("Username Not found!");
        throw new apiError(401, "Username required");

    }
    if (!email) {
        console.log("Email Not found!");
        throw new apiError(401, "Email required");

    }
    if (!fullName) {
        console.log("FullName is Required!");
        throw new apiError(401, "Fullname is required");

    }
    if (!password) {
        console.log("password is Required!");
        throw new apiError(401, "password is required");
    }
    const ExistingUser = await User.findOne({username});
        // console.log(ExistingUser);

      if(ExistingUser){
        throw new apiError(409,"User Already Exists faizzz");

      }
       const avatarImagePath = await req.files?.avatar[0]?.path;
       const coverImagePath =await req.files?.coverImage[0]?.path;
if(!avatarImagePath){
    throw new apiError(400,"please upload Avatar Image")
}
       let avatarImage  =  await uploadOnCloudinary(avatarImagePath);
       let coverImage  =  await uploadOnCloudinary(coverImagePath);
       if(!avatarImage){
        throw new apiError(400,"please upload Avatar Image")
       }
      let  createUser  = await User.create({
           username:username.toLowerCase(),
           email:email,
           fullName:fullName,
           avatar:avatarImage.url, 
           coverImage:coverImage?.url||"",
           password:password
      }) 
      console.log(`user created successfully`);
     const displayUser = await User.findById(createUser._id).select('-password -refreshToken');
     console.log(displayUser)

       
        

         
})
export { registerUser };