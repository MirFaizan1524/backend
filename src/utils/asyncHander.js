//METHOD_1:
// const asyncHander = (fn)=>async(req,res,next)=>{
//    try{
//    }
//    catch(err){
//      res.status(err.code||500).json({
//        success:false,
//        message:err.message
//      })

//    }      
// }METHOD_2:

const asyncHandler = (requestHandler)=>{
    return((req,res,next)=>{ 
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>{
              next(err);
        })     
  } )   
}
export {asyncHandler};