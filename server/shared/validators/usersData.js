import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};
  if (data.username === undefined || Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (/^[a-zA-Z0-9]*$/.test(data.username) === false) {
    errors.username = 'Username can only be numbers and letters without space';
  }
  if (/^[a-zA-Z ]*$/.test(data.fullname) === false) {
    errors.fullname = 'Username can only be letters';
  }
  if (data.email === undefined || Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (data.email === undefined || !Validator.isEmail(data.email)) {
    errors.email = 'Email must be valid';
  }
  if (data.fullname === undefined || Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Fullname is required';
  }
  if (data.password === undefined || Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (data.passwordConfirmation === undefined ||
    Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password confirmation is required';
  }
  if (data.password !== undefined &&
    data.password !== data.passwordConfirmation) {
    errors.passwordConfirmation = 'Password does not match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateInput;
