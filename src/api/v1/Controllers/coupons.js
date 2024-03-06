const { NotFoundError } = require("../../../Errors");
const { StatusCodes } = require('http-status-codes')
const Website = require("../Models/Websites");
const couponService = require('../Services/coupons')

const getAllCoupons = async (req, res) => {
    let result = await couponService.get();
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

const addNewCoupon = async (req, res) => {
    let result = await couponService.create(req.body.name);
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

module.exports = {
    getAllCoupons,
    addNewCoupon
};
