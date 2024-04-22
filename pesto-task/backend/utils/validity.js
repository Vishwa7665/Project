const checkStatusValidity = (status) => {
  const statusArray = ["To Do", "In Progress", "Done"];

  return statusArray.includes(status);
};

const checkEmailValidity =(email)=>{
  var EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let valid = EMAIL_REGEX.test(email);

if (valid) {
  return { message: process.env.VALID_EMAIL, status: true };
} else {
  return { message: process.env.INVALID_EMAIL, status: true };
}
}

module.exports = { checkStatusValidity, checkEmailValidity };
