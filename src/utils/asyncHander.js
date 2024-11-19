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
  (req,res,next)=>{
     return(
        requestHandler(Promise.resolve(req,res,next))
        .catch((err)=>{
              next(err);
        })
     )
  }    
}
export {asyncHandler};