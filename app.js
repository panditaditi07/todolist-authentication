const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

app.listen(
  process.env.PORT,
  console.log(`Server starting at port ${process.env.PORT}`)
);
