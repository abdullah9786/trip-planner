const express = require("express");
const router = express.Router();
const { generateAiResponse, getAiResponse } = require("../Controllers/ai-response");

router.route("/").get(getAiResponse).post(generateAiResponse)

module.exports = router;
