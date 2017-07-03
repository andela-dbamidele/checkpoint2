import { ADD_TO_DOCUMENTS, SET_DOCUMENTS_TO_STATE } from '../actions/type';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_DOCUMENTS:
      return [
        action.document,
        ...state
      ];
    case SET_DOCUMENTS_TO_STATE:
      return [
        ...(action.documents)
      ];
    default: return state;
  }
};
