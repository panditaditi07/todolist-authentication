const express = require("express");
const router = express.Router();
const { checkRequestBody } = require("../middlewares/userMiddlewares");
const { SignUpUser, loginUser } = require("../controllers/userController");

router.route("/signup").post(checkRequestBody, SignUpUser);

router.route("/login").post(loginUser);

module.exports = router;
