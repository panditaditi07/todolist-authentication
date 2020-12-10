const express = require("express");
const router = express.Router();
const {
  checkRequestBody,
  isEmailValid,
  isEmailUnique,
  checkConfirmPassword,
  createPasswordHash,
} = require("../middlewares/userMiddlewares");
const { SignUpUser, loginUser } = require("../controllers/userController");

router
  .route("/signup")
  .post(
    checkRequestBody,
    isEmailValid,
    isEmailUnique,
    checkConfirmPassword,
    createPasswordHash,
    SignUpUser
  );

router.route("/login").post(checkRequestBody, loginUser);

module.exports = router;
