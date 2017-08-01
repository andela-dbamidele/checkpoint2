import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as ActionTypes from '../../actions/type';
import * as DocumentActions from '../../actions/documentsAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Document Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Create Document Action', () => {
    it('creates documents', (done) => {
      moxios.stubRequest('/api/documents', {
        status: 200,
        response: {
          document: {
            title: 'hello',
            content: 'Hello'
          }
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.createDocument()).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.ADD_TO_DOCUMENTS);
        expect(store.getActions()[0].document).toEqual(
          {
            title: 'hello',
            content: 'Hello'
          }
        );
      });
      done();
    });

    it('dispatch error action if theres any error', (done) => {
      moxios.stubRequest('/api/documents', {
        status: 400,
        response: {
          title: 'A title is required'
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.createDocument()).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_DOCUMENT_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { title: 'A title is required' }
        );
      });
      done();
    });
  });

  describe('Get all documents action', () => {
    it('gets documents', (done) => {
      moxios.stubRequest('/api/documents', {
        status: 200,
        response: {
          documents: [
            {
              id: 1,
              title: 'Hello World',
              content: 'Hi dear'
            }
          ]
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.getDocuments()).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.SET_DOCUMENTS_TO_STATE);
        expect(store.getActions()[0].data.documents).toEqual(
          [
            {
              id: 1,
              title: 'Hello World',
              content: 'Hi dear'
            }
          ]
        );
      });
      done();
    });
  });

  describe('Removes all document from state', () => {
    it('removes all document from state', () => {
      const store = mockStore({});
      store.dispatch(DocumentActions.deleteDocuments());
    });
  });

  describe('Fetch single document', () => {
    it('fetches a single document from db', (done) => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          title: 'Hello'
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.setSingleDocument(1)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.SET_SINGLE_DOCUMENT_TO_STATE);
        expect(store.getActions()[0].document).toEqual(
          {
            title: 'Hello',
          }
        );
      });
      done();
    });

    it('dispatch error action if theres any error', (done) => {
      moxios.stubRequest('/api/documents/3000000', {
        status: 400,
        response: {
          message: 'Document not found'
        }
      });
      const store = mockStore({});
      store.dispatch(DocumentActions.setSingleDocument(3000000)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_DOCUMENT_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'Document not found' }
        );
      });
      done();
    });
  });

  describe('Update Documents', () => {
    it('updates a single document', (done) => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          title: 'Hello'
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.updateDocument(1)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.UPDATE_SINGLE_DOCUMENT);
        expect(store.getActions()[0].document).toEqual(
          {
            title: 'Hello',
          }
        );
      });
      done();
    });

    it('dispatch error action if theres any error', (done) => {
      moxios.stubRequest('/api/documents/3000000', {
        status: 400,
        response: {
          message: 'Document not found'
        }
      });
      const store = mockStore({});
      store.dispatch(DocumentActions.updateDocument(3000000)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_DOCUMENT_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'Document not found' }
        );
      });
      done();
    });
  });

  describe('Delete Documents', () => {
    it('deletes a single document', (done) => {
      moxios.stubRequest('/api/documents/1', {
        status: 200,
        response: {
          message: 'Docuemnt deleted successfully'
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.deleteSingleDocument(1)).then(() => {
        //
      });
      done();
    });

    it('dispatch error action if there is any error', (done) => {
      moxios.stubRequest('/api/documents/3000000', {
        status: 400,
        response: {
          message: 'Document not found'
        }
      });
      const store = mockStore({});
      store.dispatch(DocumentActions.deleteSingleDocument(3000000)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_DOCUMENT_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'Document not found' }
        );
      });
      done();
    });
  });

  describe('Search documents', () => {
    it('returns data if matching documents are found', (done) => {
      moxios.stubRequest('/api/search/documents?q=hello&offset=1&limit=1', {
        status: 200,
        response: {
          documents: [
            {
              id: 1,
              title: 'Hello World',
              content: 'Hi dear'
            }
          ]
        }
      });

      const store = mockStore({});
      store.dispatch(DocumentActions.searchDocuments('hello', 1, 1))
      .then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.SET_DOCUMENTS_TO_STATE);
        expect(store.getActions()[0].data.documents).toEqual(
          [
            {
              id: 1,
              title: 'Hello World',
              content: 'Hi dear'
            }
          ]
        );
      });
      done();
    });

    it('dispatch error action if there is any error', (done) => {
      moxios.stubRequest('/api/search/documents?q=&offset=1&limit=1', {
        status: 400,
        response: {
          message: 'Document not found'
        }
      });
      const store = mockStore({});
      store.dispatch(DocumentActions.searchDocuments('', 1, 1)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_DOCUMENT_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'Document not found' }
        );
      });
      done();
    });
  });
});
