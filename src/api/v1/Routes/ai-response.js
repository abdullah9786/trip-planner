const express = require("express");
const router = express.Router();
const { generateAiResponse, getAiResponse, generateAiResponseLoggedOutUser } = require("../Controllers/ai-response");

router.route("/").get(getAiResponse).post(generateAiResponse)
router.route("/loggedOutUser").post(generateAiResponseLoggedOutUser)

module.exports = router;
