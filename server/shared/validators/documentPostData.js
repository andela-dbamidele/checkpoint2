import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateDocumentData = (data) => {
  const errors = {};
  if (data.title === undefined || Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (data.content === undefined || Validator.isEmpty(data.content)) {
    errors.content = 'Content is required';
  }
  if (data.roleId === undefined) {
    errors.roleId = 'Document role is required';
  }
  if (data.roleId !== undefined && typeof (data.roleId) !== 'number') {
    errors.roleId = 'Role must be an integer';
  }
  if (data.userId === undefined) {
    errors.userId = 'User is required';
  }
  if (data.userId !== undefined && typeof (data.userId) !== 'number') {
    errors.userId = 'User must be an integer';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateDocumentData;
