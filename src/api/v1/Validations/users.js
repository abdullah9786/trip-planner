const { body } = require("express-validator");
const commonValidators = require("./common-validtors");

const createUserRules = [
  body("email").isLength({ min: 1 }).withMessage("Email is missing"),
];

const updateUserRules = [
  ...commonValidators.validateMongoId,
  body("websiteName").isLength({ min: 1 }).withMessage("Email is missing"),
];

const deleteWebsiteRules = [...commonValidators.validateMongoId]


module.exports = { updateUserRules, createUserRules, deleteWebsiteRules };
