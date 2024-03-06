const express = require("express");
const router = express.Router();
const { makePayment } = require("../Controllers/payment");

router.route("/").post(makePayment);

module.exports = router;
