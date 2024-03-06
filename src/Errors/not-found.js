const { StatusCodes } = require('http-status-codes')
const customAPIError = require('./custom-error')

class NotFoundError extends customAPIError{
    constructor(message, occurAt){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
        this.occurAt=occurAt
    }
}
module.exports= NotFoundError