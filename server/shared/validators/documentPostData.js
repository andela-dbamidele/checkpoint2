import isEmpty from 'lodash/isEmpty';

const validateDocumentData = (data) => {
  const errors = {};
  if (data.title === undefined || isEmpty((data.title).toString())) {
    errors.title = 'Title field is required';
  }
  if (data.content === undefined || isEmpty(data.content.toString())) {
    errors.content = 'Content is required';
  }
  if (data.author === undefined || isEmpty(data.author.toString())) {
    errors.author = 'Author is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateDocumentData;
