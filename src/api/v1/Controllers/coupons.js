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

const deleteCoupon = async (req, res) => {
    let result = await couponService.redeem(req.body.couponId, req.body.stripeCouponId);
    // console.log(req,result);
    res.status(StatusCodes.OK).json({ result });
};

const veryifyCoupon = async (req, res) => {
    let result = await couponService.verify(req.query.name);
    res.status(StatusCodes.OK).json({ result });   
}

const applyCoupon = async (req, res) => {
    let {couponName, userId} = req.body
    let result = await couponService.redeem(couponName,userId);
    res.status(StatusCodes.OK).json({ result });   
}


module.exports = {
    getAllCoupons,
    addNewCoupon,
    veryifyCoupon,
    applyCoupon,
    deleteCoupon
};
