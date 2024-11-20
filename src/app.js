import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
 app.use(cors({   // we use app.use() when we have to use middlewares or configuration
    origin:process.env.CORS,
    credentails:true
 })) 
 app.use(express.json({limit:"16kb"})); // limits the json data
 app.use(express.urlencoded({extended:true,limit:"16kb"}));
 app.use(express.static("public")); // used to store imgs,pdfs on server
 app.use(cookieParser())
// routes:
import userRouter from './routes/user.router.js'
// Routes declaration:
  app.use('/api/v1/users',userRouter);    // prefix 


export {app};