const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const paymentService = require('../Services/payment')

const makePayment = async (req, res) => {
    let result = await paymentService.pay();
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

module.exports = {
    makePayment,
};
