class apiError extends Error{
  constructor(statusCode,message="Ohhhh Faizan what you have done",errors=[],stack=""){
         super(message);
     this.statusCode = statusCode;
     this.message = message;
     this.errors = errors;
     this.success = false;
     this.data = null;
     if(stack){
         this.stack = stack
     }
     else{
        Error.captureStackTrace(this,this.construtor)
     }
  }


}
export {apiError};