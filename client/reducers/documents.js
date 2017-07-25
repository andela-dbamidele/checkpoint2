import {
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

export default (state = initialState, action = {}) => {
  switch (action.type) {
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
