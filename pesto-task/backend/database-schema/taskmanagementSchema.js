const mongoose = require("mongoose");

const taskManagementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "UserCollection",
    required: true,
  },
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: String, required: true },
});

const TaskManagementData = mongoose.model(
  "TaskManagementData",
  taskManagementSchema
);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: String, required: true },
});

const UserCollection = mongoose.model("UserCollection", userSchema);

module.exports = { TaskManagementData, UserCollection };
