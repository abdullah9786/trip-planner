const express = require("express");
const router = express.Router();
const { getAllUsers, addUser, patchUser, verifyUser, verifyGoogleUser } = require("../Controllers/users");
const validatorsResult = require("../Middleware/validators-result");
const { updateUserRules, createUserRules } = require("../Validations/users");
const validateUser = require("../Middleware/verify-user");

router.route("/").get(getAllUsers).post(createUserRules, validatorsResult , addUser);
router.route("/verify").get(verifyUser)
router.route("/google-login").get(verifyGoogleUser)
router.route("/:userId").patch(updateUserRules, validatorsResult, patchUser);

module.exports = router;
