const DB = require("./db.json");
const fs = require('fs');

//  Function to create a task and add it to the database
exports.createTask = async (req, res) => {
  try {
    if (req.body.title === "" || req.body.description === "") {
      res.status(400).json({
        message: "Title and description are required",
      });
      return;
    }
    const task = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      status: "IN-PROGRESS",
    };
    // add task to db.json file
    DB.tasks.push(task);
    // write to db.json file
    fs.writeFile("./db.json", JSON.stringify(DB), (err) => {
      if (err) {
        console.log(err);
      }
    }
    );
    res.status(201).json({
      message: "Task created successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
    });
  }
};
// Function to get all tasks from the db
exports.getTasks = async (req, res) => {
  try {
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: DB.tasks.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
    });
  }
};
// Function to get a task by id
exports.getTask = async (req, res) => {
  try {
    const id = req.params.id;
    // find task by id
    const task = DB.tasks.find((task) => task.id === id);
    if (task) {
      res.status(200).json({
        message: "Task retrieved successfully",
        data: task,
      });
    } else {
      res.status(404).json({
        message: "Task not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving task",
    });
  }
};
// Function to edit a task
exports.updateTask = async (req, res) => {
  if (req.body.title === "" || req.body.description === "") {
    res.status(400).json({
      message: "Title and description are required",
    });
    return;
  }
  try {
    const id = req.params.id;
    // find task by id
    const task = DB.tasks.find((task) => task.id === id);

    if (task) {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;
      fs.writeFile("./db.json", JSON.stringify(DB), (err) => {
        if (err) {
          console.log(err);
        }
      }
      );
      res.status(200).json({
        message: "Task updated successfully",
        data: task,
      });
    } else {
      res.status(404).json({
        message: "Task not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
};
//   Function to delete a task by id
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const index = DB.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      DB.tasks.splice(index, 1);
      fs.writeFile("./db.json", JSON.stringify(DB), (err) => {
        if (err) {
          console.log(err);
        }
      }
      );
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Task not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
