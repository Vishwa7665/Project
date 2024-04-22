const {
  TaskManagementData,
} = require("../database-schema/taskmanagementSchema");
const { checkStatusValidity } = require("../utils/validity");

async function updateStatus(id, status, userId) {
  try {
    const filter = {
      $and: [{ userId: userId }, { id: id }],
    };
    const update = { $set: { status: status } };

    await TaskManagementData.updateOne(filter, update);

    return {
      message: process.env.STATUS_UPDATE_MESSAGE,
      status: true,
    };
  } catch (error) {
    console.error("Error updating task status:", error);
    return {
      message: process.env.ERROR_MESSAGE,
      status: false,
    };
  }
}

const updateTaskStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.params.taskId;

    if (!id || !status || !checkStatusValidity(status)) {
      res.status(400).json({
        message: process.env.WRONG_PARAMETERS || "Invalid parameters",
        status: false,
      });
    } else {
      const userId = req.user.id;
      const result = await updateStatus(id, status, userId);

      res.status(200).json(result);
    }
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      message: process.env.ERROR_MESSAGE || "An error occurred",
      status: false,
    });
  }
};

module.exports = { updateTaskStatus };
