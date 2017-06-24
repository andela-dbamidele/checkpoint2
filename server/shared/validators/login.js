import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateLogin = (data) => {
  const errors = {};
  if (data.identifier === undefined || Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Username or email is required';
  }
  if (data.password === undefined || Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLogin;
