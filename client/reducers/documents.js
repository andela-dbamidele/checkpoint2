import {
  ADD_TO_DOCUMENTS,
  SET_DOCUMENTS_TO_STATE,
} from '../actions/type';

const initialState = {
  pageNumber: 0,
  pageCount: 0,
  pageSize: 0,
  documents: [],
  totalCount: 0,
  search: false,
  searchString: '',
  currentDocuments: 0
};

let oldState;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_TO_DOCUMENTS:
      oldState = state.documents;
      oldState.pop();
      return {
        pageNumber: state.pageNumber,
        pageCount: state.pageCount,
        pageSize: state.pageSize,
        documents: [
          action.document,
          ...oldState
        ],
        totalCount: state.totalCount + 1,
        search: false,
        searchString: '',
        currentDocuments: action.currentDocuments
      };
    case SET_DOCUMENTS_TO_STATE:
      return {
        pageNumber: action.data.pageNumber,
        pageCount: action.data.pageCount,
        pageSize: action.data.pageSize,
        documents: [
          ...action.data.documents
        ],
        totalCount: action.data.totalCount,
        search: action.search,
        searchString: action.searchString,
        currentDocuments: action.currentDocuments
      };
    default: return state;
  }
};
