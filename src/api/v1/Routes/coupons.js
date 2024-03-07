const express = require("express");
const router = express.Router();
const { getAllCoupons, addNewCoupon, veryifyCoupon, applyCoupon, deleteCoupon } = require("../Controllers/coupons");

router.route("/").get(getAllCoupons).post(addNewCoupon).patch(applyCoupon).delete(deleteCoupon);
router.route("/verify").get(veryifyCoupon)

module.exports = router;
