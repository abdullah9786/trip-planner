const express = require("express");
const router = express.Router();
const { getAllWebsites, createWebsite, patchWebsite, deleteWebsite } = require("../Controllers/websites");
const validatorsResult = require("../Middleware/validators-result");
const { updateWebsiteRules, createWebsiteRules, deleteWebsiteRules } = require("../Validations/websites");

router.route("/").get(getAllWebsites).post(createWebsiteRules, validatorsResult , createWebsite);
router.route("/:websiteId").patch(updateWebsiteRules, validatorsResult, patchWebsite).delete(deleteWebsiteRules, validatorsResult , deleteWebsite);

module.exports = router;
