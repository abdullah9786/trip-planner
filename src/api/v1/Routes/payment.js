const express = require("express");
const router = express.Router();
const { makePayment, webHookController } = require("../Controllers/payment");

router.route("/").post(makePayment);
router.route("/webhook").get(webHookController);

module.exports = router;
