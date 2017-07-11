import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateRolePostData = (data) => {
  const errors = {};

  if (data.name === undefined || Validator.isEmpty(data.name)) {
    errors.name = 'Role name is required';
  }

  if (data.description === undefined || Validator.isEmpty(data.description)) {
    errors.description = 'Role description is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateRolePostData;

