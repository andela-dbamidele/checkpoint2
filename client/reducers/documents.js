import {
  ADD_TO_DOCUMENTS,
  SET_DOCUMENTS_TO_STATE,
} from '../actions/type';

const initialState = {
  rows: [],
  count: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_DOCUMENTS:
      return {
        rows: [
          action.document,
          ...state.rows
        ],
        count: state.count + 1
      };
    case SET_DOCUMENTS_TO_STATE:
      return {
        rows: [
          ...action.documents.rows
        ],
        count: action.documents.count
      };
    default: return state;
  }
};
