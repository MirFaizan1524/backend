import dotenv from 'dotenv';
import connectDb from './DbConnection/db.js';
import {app} from './app.js'
dotenv.config({
    path:'./.env',
})
connectDb()
.then(()=>{
   app.listen(process.env.PORTNO,()=>{
       console.log(`server is running on portnumber: ${process.env.PORTNO}`);    

   })
})
.catch((err)=>{
    console.log("oops not connected to db",err)
})





// /*-r dotenv/config --experimental-json-modules src/*/
