const { customAPIError } = require(".");
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  let customError= {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something Went Wrong',
    occurAt: err.occurAt || 'Internal' 
  }
  // if (err instanceof customAPIError) {
  //   return res.status(err.statusCode).json({ result: {errorMessage: err.message} });
  // }
  
  if(err.code && err.code === 11000){
    customError.message = `Duplicate Value Entered For Field: ${Object.keys(err.keyValue)}`
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.occurAt = "Error Handler Middleware > 11000"
  }

  if(err.name === 'ValidationError'){
    customError.message = Object.values(err.errors).map((item)=>item.message).join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.occurAt = "Error Handler Middleware > Validation Error"
  }
  
  if(err.name === 'CastError'){
    customError.message = ` Cast Error Occured On Value ${err.value}`
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.occurAt = "Error Handler Middleware > Cast Error"
  }
  
  return res.status(customError.statusCode).json({ result: {errorMessage: customError.message, errorOccurAt: customError.occurAt} });
};

module.exports = errorHandlerMiddleware;
