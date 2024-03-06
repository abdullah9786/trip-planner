const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const aiResponse = require('../Services/ai-response')

const getAiResponse = async (req, res) => {
    let result = await aiResponse.get();
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

module.exports = {
    getAiResponse,
};
