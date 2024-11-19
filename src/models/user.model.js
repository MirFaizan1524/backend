import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";
const userSchema = new Schema({
username:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
  index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,

  },
  fullName:{
     type:String,
     required:true
  },
  avatar:{
    type:String,  //cloudinary url
    required:true,
  },
  coverImage:{
    type:String,
  },
  watchHistory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"videos"
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  refreshToken:{
     type:String
  }


},{timestamps:true});
  userSchema.pre("save",function(next){
      if(!this.isModified('password')){
           return next();  
      }
    this.password = bcrypt.hash(this.password,10)
    next()
  })
  userSchema.methods.isPasswordCorrect = async(password)=>{
           return await bcrypt.compare(password,this.password);    
  }
  userSchema.methods.generateAccessToken = ()=>{
     return jwt.sign({
            _id:this._id,
            email:this.email,
            fullName:this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
      )

  }

  userSchema.methods.generateRefreshToken = ()=>{
    return jwt.sign({
           _id:this._id,
           
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
     )

 }

export const User = mongoose.model("User",userSchema);