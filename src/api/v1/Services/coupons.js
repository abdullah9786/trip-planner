const Coupon = require("../Models/Coupons.js");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const BadRequestError = require("../../../Errors/bad-request.js");
const NotFoundError = require("../../../Errors/not-found.js");
const { log } = require("console");
const Users = require("../Models/Users.js");
const stripe = require('stripe')('sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN');

const get = async () => {
    let result = await Coupon.find()
    return result;
};

const create = async (name) => {
    const coupon = await stripe.coupons.create({
        // duration_in_months: 3,
        duration: "forever",
        name,
        percent_off: 100,
    });
    await Coupon.create({
        name,
        percent_off: 100,
        stripeCouponId: coupon.id
    });

    console.log(coupon);
    return "coupon Created Successfully"
}
const remove = async (couponId, stripeCouponId) => {
    Users.updateMany({ couponRef: couponId }, { $set: { couponRef: "", isPremium: false, isIternaryAllowed: false } });
    const deleted = await stripe.coupons.del(stripeCouponId);
    let result = await Coupon.findByIdAndDelete({ _id: couponId })
    return result;
};
const verify = async (couponName) => {
    let coupon = await Coupon.findOne({ name: couponName })
    console.log(coupon);
    if (coupon) {
        return "valid";
    }
    else {
        return "invalid";
    }
}

const redeem = async (couponName, userId) => {
    let coupon = await Coupon.findOne({ name: couponName })
    console.log(coupon);
    if (coupon) {
        let user = await Users.findOne({ _id: userId })
        if (user) {
            user.isPremium = true
            user.stripeCoupon = coupon._id
            user.save()
            console.log(user);
            await sendMail(`Coupon Redeem`,user.email)
            return user
        }
        else {
            throw new NotFoundError("User not Found", "Coupon Service");
        }
    }
    else {
        return "invalid";
    }
}
module.exports = {
    get,
    create,
    remove,
    verify,
    redeem
};
