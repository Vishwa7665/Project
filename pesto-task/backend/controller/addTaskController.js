const {
  TaskManagementData,
} = require("../database-schema/taskmanagementSchema");
const { checkStatusValidity } = require("../utils/validity");

async function addNewTask(data, userId) {
  try {
    // Generating unique Id for each task
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const id = `${timestamp}${random}`;

    var currentDate = new Date();

    const TaskData = new TaskManagementData({
      userId: userId,
      id: id,
      title: data.title,
      description: data.description,
      status: data.status,
      created_at: currentDate,
    });

    await TaskData.save();

    return {
      message: process.env.TASK_DATA_SAVED,
      status: true,
    };
  } catch (error) {
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
}

const addTask = async (req, res) => {
  try {
    const taskData = req.body;
    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.status ||
      !checkStatusValidity(taskData.status)
    ) {
      res.statusCode = 400;
      res.send({
        message: process.env.WRONG_PARAMETERS,
        status: false,
      });
    } else {
      const userId = req.user.id;
      const status = await addNewTask(taskData, userId);
      res.statusCode = 200;
      res.send(status);
    }
  } catch (error) {
    return res.status(500).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

module.exports = {
  addTask,
};
