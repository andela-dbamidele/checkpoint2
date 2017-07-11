import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import singleDocument from './singleDocument';
import errors from './errors';
import success from './success';
import users from './users';

export default combineReducers({
  auth,
  documents,
  singleDocument,
  errors,
  success,
  users
});
