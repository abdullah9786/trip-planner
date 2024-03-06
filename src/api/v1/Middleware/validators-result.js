const { validationResult } = require("express-validator");
const { BadRequestError } = require("../../../Errors");
const errorMessageFormat = require("../Helpers/format-error-message");

const validatorsResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorMessage = errorMessageFormat(errors.array());
    throw new BadRequestError(errorMessage,"Validator Middleware");
  }
  next();
};

module.exports = validatorsResult