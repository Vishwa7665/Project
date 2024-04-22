const {
  TaskManagementData,
} = require("../database-schema/taskmanagementSchema");

async function getAllTasksData(userId) {
  try {
    const data = await TaskManagementData.find({ userId: userId });
    let returnData = data.map((ele) => {
      return {
        title: ele.title,
        id: ele.id,
        description: ele.description,
        status: ele.status,
        created_at: ele.created_at,
      };
    });

    return returnData;
  } catch (error) {
    console.error("Error fetching all tasks data:", error);
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
}

async function getOneTask(userId, taskId) {
  try {
    const taskData = await TaskManagementData.findOne({
      $and: [{ userId: userId }, { id: taskId }],
    });

    if (taskData) {
      const formattedTask = {
        title: taskData.title,
        id: taskData.id,
        description: taskData.description,
        status: taskData.status,
        created_at: taskData.created_at,
      };
      return { data: formattedTask, status: true };
    } else {
      return {
        message: process.env.TASK_DETAILS_NOT_FOUND,
        status: false,
      };
    }
  } catch (error) {
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
}
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await getAllTasksData(userId);
    res.status(200).json({ data: tasks, status: true });
  } catch (error) {
    console.error("Error getting all tasks:", error);
    res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

// Route handler to get a single task by ID for a user
const getTaskUsingId = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const taskData = await getOneTask(userId, taskId);
    res.json(taskData);
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

module.exports = { getAllTasks, getTaskUsingId };
