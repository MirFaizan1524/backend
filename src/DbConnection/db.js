import mongoose from 'mongoose';
import {Db_Name} from '../constants.js';
let connectDb = async()=>{
        try{
           let connectionInstance = await mongoose.connect(`${process.env.MONGOURI}/${Db_Name}`); 
           console.log("connectionInstance");         
        }
        catch(err){
            console.log("Connection Failed",err);
            process.exit(1);
        }


}
export default connectDb;

    