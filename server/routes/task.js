const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
router
  .route("/tasks")
  .get(taskController.getAllTasks)
  .post(taskController.addTask);

router
  .route("/tasks/:id")
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);

module.exports = router;
