const checkStatusValidity = (status) => {
  const statusArray = ["To Do", "In Progress", "Done"];

  return statusArray.includes(status);
};

module.exports = { checkStatusValidity };
