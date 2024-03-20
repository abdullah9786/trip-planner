const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const paymentService = require('../Services/payment')

const makePayment = async (req, res) => {
    let result = await paymentService.checkoutSession();
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

const webHookController = async (req, res) => {
    let result = await paymentService.webhook(req);
    // res.status(StatusCodes.OK).json({ result });
    res.status(200).end();
}

module.exports = {
    makePayment,
    webHookController
};
