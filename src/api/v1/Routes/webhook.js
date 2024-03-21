const express = require("express");
const router = express.Router();
const {  webHookController } = require("../Controllers/payment");

router.route("/").post(webHookController);

module.exports = router;
