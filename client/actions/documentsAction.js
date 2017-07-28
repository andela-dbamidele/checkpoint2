import axios from 'axios';
import {
  ADD_TO_DOCUMENTS,
  SET_DOCUMENTS_TO_STATE,
  SET_SINGLE_DOCUMENT_TO_STATE,
  CREATE_DOCUMENT_ERROR,
  UPDATE_SINGLE_DOCUMENT
 } from './type';

const addSingleDocumentFromDb = (document, access) => (
  {
    type: SET_SINGLE_DOCUMENT_TO_STATE,
    document,
    currentDocuments: access
  }
);

const addSingleDocFromDb = (document, access) => (
  {
    type: ADD_TO_DOCUMENTS,
    document,
    currentDocuments: access
  }
);

const addAllDocumentsToState = (documents, access, search = false,
  searchString = '') => (
  {
    type: SET_DOCUMENTS_TO_STATE,
    data: documents,
    search,
    searchString,
    currentDocuments: access
  }
);

const setError = errors => (
  {
    type: CREATE_DOCUMENT_ERROR,
    errors
  }
);

const updateAction = document => (
  {
    type: UPDATE_SINGLE_DOCUMENT,
    document
  }
);

/**
 * gets document from databse and save to store
 * @function getDocuments
 * @param {number} access -
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @export
 * @returns {promise} -
 */
export function getDocuments(access = 0, offset, limit) {
  return dispatch => (
    axios.get('/api/documents', {
      params: {
        offset,
        limit,
        access
      }
    })
  ).then(
    (response) => {
      dispatch(addAllDocumentsToState(response.data, access, false));
    }
  );
}

/**
 * Saves a new document to the database
 * and dispatch an action with the new document
 * to the store
 * @function createDocument
 * @export
 * @param {object} document
 * @param {number} access
 * @returns {void}
 */
export function createDocument(document, access) {
  return dispatch => (
    axios.post('/api/documents', document)
  ).then(
    (response) => {
      dispatch(addSingleDocFromDb(response.data.document, access));
    },
    ({ response }) => {
      const errors = response.data;
      return dispatch(setError(errors));
    }
  );
}

/**
 * removes all documents from state by
 * setting the documents to empty array
 * @function deleteDocument
 * @export
 * @returns {void}
 */
export function deleteDocuments() {
  return (dispatch) => {
    dispatch(addAllDocumentsToState({
      pageNumber: 0,
      pageCount: 0,
      pageSize: 0,
      documents: [],
      totalCount: 0,
      search: false,
      searchString: ''
    }));
  };
}

/**
 * Gets document from database and
 * add them to state
 * @function setSingleDocumentument
 * @export
 * @param {int} docId
 * @param {int} access
 * @returns {void}
 */
export function setSingleDocument(docId, access) {
  return dispatch => (
    axios.get(`/api/documents/${docId}`)
  ).then((response) => {
    dispatch(addSingleDocumentFromDb(response.data, access));
  },
  ({ response }) => {
    dispatch(setError(response.data));
    return true;
  }
  );
}

/**
 * Update a single document
 * @function updateDocument
 * @export
 * @param {int} docId
 * @param {object} data
 * @returns {void}
 */
export function updateDocument(docId, data) {
  return dispatch => (
    axios.put(`/api/documents/${docId}`, data)
  ).then((document) => {
    dispatch(updateAction(document.data));
  },
  ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}

/**
 * Deletes a particular document
 * @function deleteSingleDocumentument
 * @export
 * @param {int} docId
 * @return {void}
 */
export function deleteSingleDocument(docId) {
  return dispatch => (
    axios.delete(`/api/documents/${docId}`)
  ).then(() => {
    //
  },
  ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}

/**
 * Query the database for a document
 * @function searchDocuments
 * @export
 * @param {string} searchString - the search string
 *  @param {number} access -
 * @param {number} offset -
 * @param {number} limit -
 * @return {void}
 */
export function searchDocuments(searchString, access = 0, offset, limit = 0) {
  return dispatch => (
    axios.get('/api/search/documents', {
      params: {
        q: searchString,
        offset,
        limit,
        access
      }
    })
  ).then((response) => {
    let search = true;
    if (searchString === '') {
      search = false;
    }
    dispatch(addAllDocumentsToState(response.data, access,
        search, searchString));
  },
  ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}
