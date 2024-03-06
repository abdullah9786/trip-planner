const { param } = require("express-validator");

const validateMongoId = [
    param("websiteId").isLength({ min: 24, max: 24 }).withMessage("Invalid website ID"),
];

module.exports = { validateMongoId }