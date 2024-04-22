const express = require("express");
const router = express.Router();

const { addTask } = require("../controller/addTaskController");
const { removeTask } = require("../controller/removeTaskController");
const { verifyUser } = require("../middleware/verifyUser");
const {
  userLogin,
  userRegister,
  userLogout,
} = require("../controller/userController");
const {
  getAllTasks,
  getTaskUsingId,
} = require("../controller/getTaskDataController");
const { updateTaskStatus } = require("../controller/updateTaskController");
const { userSessionVerify } = require("../controller/sessionController");

router.post("/user-session-verify", verifyUser, userSessionVerify);
router.post("/user-login", userLogin);
router.post("/user-register", userRegister);
router.post("/user-logout", verifyUser, userLogout);
router.post("/task-data", verifyUser, addTask);
router.delete("/task-data/:taskId", verifyUser, removeTask);
router.get("/task-data", verifyUser, getAllTasks);
router.put("/task-data/:taskId", verifyUser, updateTaskStatus);
router.get("/task-data/:taskId", verifyUser, getTaskUsingId);

module.exports = router;
