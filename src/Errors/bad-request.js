const { StatusCodes } = require('http-status-codes')
const customAPIError = require('./custom-error')

class BadRequestError extends customAPIError{
    constructor(message,occurAt){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.occurAt=occurAt
    }
}
module.exports= BadRequestError