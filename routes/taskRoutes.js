const express = require("express");
const { getAllTasks } = require("../controllers/taskController");
const { protectRoute } = require("../middlewares/protectRoute");
const router = express.Router();
router.route("/tasks").get(protectRoute, getAllTasks);
module.exports = router;
