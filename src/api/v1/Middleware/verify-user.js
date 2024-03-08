const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../Errors");
const Users = require("../Models/Users");
const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
    const userId  = req.query.userId;
    if (!userId) {
        // return res.status(400).json({ error: 'UserId is missing.' });
    throw new BadRequestError("UserId is missing","Validator Middleware");
      }
  
      const user = await Users.findOne({ _id: userId });
  
      if (!user) {
        throw new NotFoundError("UserId is Invalid","Validator Middleware");
      }
  
      if (user.isValid) {
        return res.status(StatusCodes.OK).json({ result: user });
      }
      else{
        throw new NotFoundError("UserId is Invalid","Validator Middleware");
      }
  
};

module.exports = validateUser