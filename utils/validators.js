import { validate } from "email-validator";

const isEmpty = (err) => {
  return Object.keys(err).length === 0;
}

const validateLoginInput = (data) => {
  let errors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!validate(data.email)) {
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
  } else if (!validate(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password) {
    errors.password = 'Password is required';
  }

  if (!data.cPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  }

  if (data.password !== data.cPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}

export { validateLoginInput, validateRegisterInput };