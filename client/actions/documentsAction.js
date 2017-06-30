import axios from 'axios';
import { ADD_TO_DOCUMENTS, SET_DOCUMENTS_TO_STATE } from './type';

const addSingleDocumentToState = document => (
  {
    type: ADD_TO_DOCUMENTS,
    document
  }
);

const addAllDocumentsToState = documents => (
  {
    type: SET_DOCUMENTS_TO_STATE,
    documents
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
