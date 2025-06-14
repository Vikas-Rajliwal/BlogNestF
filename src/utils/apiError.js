class ApiError extends Error {
  constructor(statusCode ,message ="somthing went wrong", error=[],stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data =null;
    this.message = message;
    this.error = error;
    this.success = false;
    if(stack) {
      this.stack = stack;
    }else{
         Error.captureStackTrace(this, this.constructor)
    }
  }
}
module.exports = ApiError;