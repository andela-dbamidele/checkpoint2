import { isEmpty } from 'lodash';

const validateLogin = (data) => {
  const errors = {};
  if (data.identifier === undefined || isEmpty((data.identifier).toString())) {
    errors.identifier = 'Username or email is required';
  }
  if (data.password === undefined || isEmpty((data.password).toString())) {
    errors.password = 'Password cannot be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLogin;
