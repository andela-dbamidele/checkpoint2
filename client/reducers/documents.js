import {
  ADD_TO_DOCUMENTS,
  SET_DOCUMENTS_TO_STATE,
} from '../actions/type';

const initialState = {
  pageNumber: 0,
  pageCount: 0,
  pageSize: 0,
  documents: [],
  totalCount: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_DOCUMENTS:
      return {
        pageNumber: state.pageNumber,
        pageCount: state.pageCount,
        pageSize: state.pageSize,
        documents: [
          action.document,
          ...state.documents
        ],
        totalCount: state.totalCount + 1,
      };
    case SET_DOCUMENTS_TO_STATE:
      return {
        pageNumber: action.data.pageNumber,
        pageCount: action.data.pageCount,
        pageSize: action.data.pageSize,
        documents: [
          action.data.documents
        ],
        totalCount: action.totalCount,
      };
    default: return state;
  }
};
