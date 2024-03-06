const { body } = require("express-validator");
const commonValidators = require("./common-validtors");

const createWebsiteRules = [
  body("websiteName").isLength({ min: 1 }).withMessage("Website Name is missing"),
];

const updateWebsiteRules = [
  ...commonValidators.validateMongoId,
  body("websiteName").isLength({ min: 1 }).withMessage("Website Name is missing"),
];

const deleteWebsiteRules = [...commonValidators.validateMongoId]


module.exports = { updateWebsiteRules, createWebsiteRules, deleteWebsiteRules };
