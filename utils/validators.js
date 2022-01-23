const validator = require("email-validator");

const isEmpty = (err) => {
  return Object.keys(err).length === 0;
}

const validateLoginInput = (data) => {
  let errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validator.validate(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
};

const validateRegisterInput = (data) => {
  let errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validator.validate(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  if (!data.cPassword) {
    errors.password2 = 'Confirm Password is required';
  }

  if (data.password !== data.cPassword) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}

module.exports = {
  validateLoginInput,
  validateRegisterInput
}