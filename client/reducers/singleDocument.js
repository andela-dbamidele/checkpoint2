import {
  SET_SINGLE_DOCUMENT_TO_STATE,
  UPDATE_SINGLE_DOCUMENT
} from '../actions/type';

const initState = {};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case SET_SINGLE_DOCUMENT_TO_STATE:
      return action.document;
    case UPDATE_SINGLE_DOCUMENT:
      return action.document;
    default: return state;
  }
};
