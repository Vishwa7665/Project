const { UserCollection } = require("../database-schema/taskmanagementSchema");

const userSessionVerify = async (req, res) => {
  try {
    let data = await UserCollection.find({ _id: req.user.id });
    if (data.length === 0) {
      res.status(401).json({
        status: false,
        message: process.env.UNAUTHORIZED,
      });
    } else {
      res.status(200).json({
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

module.exports = {
  userSessionVerify,
};
