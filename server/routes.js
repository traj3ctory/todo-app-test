const express = require("express");
const router = express.Router();
const task = require("./controller");

// ========== create a new task
router.post("/", async (req, res) => {
  task.createTask(req, res);
});
//========== GET request to get all task
router.get("/", async (req, res) => {
  task.getTasks(req, res);
});

//========== GET request to get a task by id
router.get("/:id", async (req, res) => {
  task.getTask(req, res);
});

// =========== Edit task
router.put("/:id", async (req, res) => {
  task.updateTask(req, res);
});
//========== DELETE request to delete a task by id
router.delete("/:id", async (req, res) => {
  task.deleteTask(req, res);
});

module.exports = router;
