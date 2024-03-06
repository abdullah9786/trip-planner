const express = require("express");
const router = express.Router();
const { getAllWebsites, createWebsite, patchWebsite, deleteWebsite } = require("../Controllers/websites");
const validatorsResult = require("../Middleware/validators-result");
const { updateWebsiteRules, createWebsiteRules, deleteWebsiteRules } = require("../Validations/websites");
const { getAiResponse } = require("../Controllers/ai-response");

router.route("/").get(getAiResponse).post(createWebsiteRules, validatorsResult , createWebsite);
router.route("/:websiteId").patch(updateWebsiteRules, validatorsResult, patchWebsite).delete(deleteWebsiteRules, validatorsResult , deleteWebsite);

module.exports = router;
