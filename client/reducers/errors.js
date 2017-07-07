import {
  CREATE_DOCUMENT_ERROR
} from '../actions/type';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case CREATE_DOCUMENT_ERROR:
      state.document = action.errors;
      return state;
    default: return state;
  }
};
