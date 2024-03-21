const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const users = require("../Models/Users.js");
const userService = require('../Services/users.js')
const requestIP = require('request-ip');
const IP = require('ip');

const getAllUsers = async (req, res) => {
  console.log(requestIP.getClientIp(req),"Asd",IP.address());
  let result = await userService.get();
  res.status(StatusCodes.OK).json({ result });
};

const addUser = async (req, res) => {
  let result = await userService.create(req.body);
  res.status(StatusCodes.CREATED).json({ result });
};

const patchUser = async (req, res) => {
  let {userId,couponStatus} = req.body
  let result = await userService.update(userId,couponStatus)
  if(!result){
    throw new NotFoundError('No User Found For: '+userId, 'User Controller')
  }
  res.status(StatusCodes.OK).json({ result });
};

const verifyUser = async (req,res) => {
  let token = req.query.token
  let result = await userService.verify(token)
  res.status(StatusCodes.OK).json({ result });
}

const verifyGoogleUser = async (req,res) => {
  let token = req.query.token
  console.log(token);
  let result = await userService.googleLogin(token)
  res.status(StatusCodes.OK).json({ result });
}



module.exports = {
  getAllUsers,
  addUser,
  patchUser,
  verifyUser,
  verifyGoogleUser
};
