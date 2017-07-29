import documentReducer from '../../reducers/documents';
import * as ActionTypes from '../../actions/type';

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

describe('Document reducer', () => {
  describe('Create Document Action', () => {
    it('adds to the documents in the database when called', () => {
      const document = {
        id: 1,
        title: 'Hello World',
        content: 'The sky is the starting point'
      };
      const action = {
        type: ActionTypes.ADD_TO_DOCUMENTS,
        document,
        search: false,
        searchString: '',
        currentDocuments: 0,
        pageNumber: 0,
        pageCount: 0,
        pageSize: 0,
      };
      const expected = {
        pageNumber: 0,
        pageCount: 0,
        pageSize: 0,
        documents: [document],
        totalCount: 1,
        search: false,
        searchString: '',
        currentDocuments: 0
      };
      const newState = documentReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('Set documents to state action', () => {
    it('adds to the documents in the database when called', () => {
      const document = {
        id: 1,
        title: 'Hello World',
        content: 'The sky is the starting point'
      };
      const action = {
        type: ActionTypes.SET_DOCUMENTS_TO_STATE,
        data: {
          pageNumber: 0,
          pageCount: 0,
          pageSize: 0,
          documents: [document],
          totalCount: 1,
        },
        searchString: '',
        search: false,
        currentDocuments: 0
      };
      const expected = {
        pageNumber: 0,
        pageCount: 0,
        pageSize: 0,
        documents: [document],
        totalCount: 1,
        search: false,
        searchString: '',
        currentDocuments: 0
      };
      const newState = documentReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('Default State', () => {
    it('returns the state if no action is passed', () => {
      const action = {
        type: 'HELLO_WORLD'
      };
      const expected = {
        pageNumber: 0,
        pageCount: 0,
        pageSize: 0,
        documents: [],
        totalCount: 0,
        search: false,
        searchString: '',
        currentDocuments: 0
      };
      const newState = documentReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });
});
