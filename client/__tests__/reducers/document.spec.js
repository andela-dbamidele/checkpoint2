import documentReducer from '../../reducers/documents';
import * as Actions from '../../actions/documentsAction';

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

});
