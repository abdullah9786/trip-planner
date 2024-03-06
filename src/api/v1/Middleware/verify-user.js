const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../../Errors");
const Users = require("../Models/Users");
const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
    const token  = req.headers.authorization;
    if (!token) {
        // return res.status(400).json({ error: 'Token is missing.' });
    throw new BadRequestError("Token is missing","Validator Middleware");
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findOne({ email: decoded.email });
  
      if (!user) {
        throw new NotFoundError("Token is missing","Validator Middleware");
      }
  
      if (user.isValid) {
        return res.status(StatusCodes.OK).json({ result: {isValid:true} });
      }
  
      user.isValid = true;
      await user.save();
    next();
};

module.exports = validateUser