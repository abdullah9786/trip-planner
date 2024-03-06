const express = require("express");
const router = express.Router();
const { getAllCoupons, addNewCoupon } = require("../Controllers/coupons");

router.route("/").get(getAllCoupons).post(addNewCoupon);

module.exports = router;
