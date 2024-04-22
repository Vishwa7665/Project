const {
  TaskManagementData,
} = require("../database-schema/taskmanagementSchema");

const deleteTask = async (taskId, userId) => {
  try {
    const taskData = await TaskManagementData.findOne({
      $and: [{ userId: userId }, { id: taskId }],
    });

    if (taskData) {
      const filter = { $and: [{ userId: userId }, { id: taskId }] };
      await TaskManagementData.deleteOne(filter);

      return {
        message: process.env.TASK_DELETED_MESSAGE,
        status: true,
      };
    } else {
      return {
        message: process.env.TASK_ALREADY_DELETED,
        status: false,
      };
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
};

const removeTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.id;

    if (!taskId) {
      res.status(400).json({
        message: process.env.WRONG_PARAMETERS,
        status: false,
      });
    } else {
      const status = await deleteTask(taskId, userId);
      res.status(200).json(status);
    }
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

module.exports = { removeTask };
