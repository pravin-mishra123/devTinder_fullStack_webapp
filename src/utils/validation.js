const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter a valid name");
  }
  // else if (firstName.length < 4 || firstName.length > 50) {
  //   throw new Error("First Name should be 4-50 charecters");
  // }
  else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

module.exports = {
  validateSignUpData,
};
