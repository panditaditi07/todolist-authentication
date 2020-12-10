const express = require("express");
const router = express.Router();
const {
  checkRequestBody,
  isEmailValid,
  isEmailUnique,
} = require("../middlewares/userMiddlewares");
const { SignUpUser, loginUser } = require("../controllers/userController");

router
  .route("/signup")
  .post(checkRequestBody, isEmailValid, isEmailUnique, SignUpUser);

router.route("/login").post(loginUser);

module.exports = router;
