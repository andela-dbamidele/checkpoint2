import axios from 'axios';
import { ADD_TO_DOCUMENTS,
  SET_DOCUMENTS_TO_STATE,
  SET_SINGLE_DOCUMENT_TO_STATE,
  CREATE_DOCUMENT_ERROR,
  UPDATE_SINGLE_DOCUMENT
 } from './type';

const addSingleDocumentToState = document => (
  {
    type: ADD_TO_DOCUMENTS,
    document
  }
);

const addSingleDocFromDb = document => (
  {
    type: SET_SINGLE_DOCUMENT_TO_STATE,
    document
  }
);

const addAllDocumentsToState = documents => (
  {
    type: SET_DOCUMENTS_TO_STATE,
    documents
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
    (response) => {
      dispatch(addSingleDocumentToState(response.data));
    },
    ({ response }) => {
      const errors = response.data;
      return dispatch(setError(errors));
    }
  );
}


/**
 * gets document from databse and save to store
 * @function getDocuments
 * @export
 * @returns {promise} -
 */
export function getDocuments() {
  return dispatch => (
    axios.get('/api/documents')
  ).then(
    (response) => {
      dispatch(addAllDocumentsToState(response.data));
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
    dispatch(addAllDocumentsToState([]));
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
