import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import singleDocument from './singleDocument';
import errors from './errors';
import success from './success';

export default combineReducers({
  auth,
  documents,
  singleDocument,
  errors,
  success
});
