const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const aiResponse = require('../Services/ai-response')

const getAiResponse = async (req, res) => {
    const id = req.query.id  
    let result = await aiResponse.get(id);
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};
const generateAiResponse = async (req, res) => {
    const {userId, promptInfo} = req.body   
    console.log(promptInfo,"lll");
    let result = await aiResponse.create(userId, promptInfo);
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};
const generateAiResponseLoggedOutUser = async (req, res) => {
    const {promptInfo} = req.body   
    let result = await aiResponse.createForLoggedOutUser( promptInfo);
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

module.exports = {
    generateAiResponse,
    getAiResponse,
    generateAiResponseLoggedOutUser
};
