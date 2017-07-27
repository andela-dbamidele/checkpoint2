import axios from 'axios';
import {
  SET_DOCUMENTS_TO_STATE,
  SET_SINGLE_DOCUMENT_TO_STATE,
  CREATE_DOCUMENT_ERROR,
  UPDATE_SINGLE_DOCUMENT
 } from './type';

const addSingleDocFromDb = document => (
  {
    type: SET_SINGLE_DOCUMENT_TO_STATE,
    document
  }
);

const addAllDocumentsToState = (documents, search = false,
  searchString = '') => (
  {
    type: SET_DOCUMENTS_TO_STATE,
    data: documents,
    search,
    searchString,
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
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @param {number} access -
 * @export
 * @returns {promise} -
 */
export function getDocuments(offset, limit, access = 0) {
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
      dispatch(addAllDocumentsToState(response.data, false));
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
 * @returns {void}
 */
export function createDocument(document) {
  return dispatch => (
    axios.post('/api/documents', document)
  ).then(
    () => {
      dispatch(getDocuments(0, 16));
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
 * @function setSingleDocument
 * @export
 * @param {int} docId
 * @returns {void}
 */
export function setSingleDocument(docId) {
  return dispatch => (
    axios.get(`/api/documents/${docId}`)
  ).then((response) => {
    dispatch(addSingleDocFromDb(response.data));
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
 * @function deleteSingleDocument
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
 * @param {number} offset -
 * @param {number} limit -
 * @param {number} access -
 * @return {void}
 */
export function searchDocuments(searchString, offset, limit, access = 0) {
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
    dispatch(addAllDocumentsToState(response.data, search, searchString));
  },
  ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}
