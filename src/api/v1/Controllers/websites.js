const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const websiteService = require('../Services/websites')

const getAllWebsites = async (req, res) => {
  let result = await websiteService.get();
  res.status(StatusCodes.OK).json({ result });
};

const createWebsite = async (req, res) => {
  let result = await websiteService.create(req.body);
  res.status(StatusCodes.CREATED).json({ result });
};

const patchWebsite = async (req, res) => {
  let {websiteId,websiteName,customFields} = {...req.params,...req.body}
  let result = await websiteService.update(websiteId,websiteName,customFields)
  if(!result){
    throw new NotFoundError('No Website Found For: '+websiteId, 'Website Controller')
  }
  res.status(StatusCodes.OK).json({ result });
};

const deleteWebsite = async (req, res) => {
  let websiteId = req.params.websiteId
  let result = await websiteService.remove(websiteId)
  res.status(StatusCodes.OK).json({ result });
}

module.exports = {
  getAllWebsites,
  createWebsite,
  patchWebsite,
  deleteWebsite
};
