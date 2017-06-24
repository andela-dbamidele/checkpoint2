import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};
  if (data.username === undefined || Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  }
  if (data.email === undefined || Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (data.fullname === undefined || Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Fullname is required';
  }
  if (data.password === undefined || Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateInput;
