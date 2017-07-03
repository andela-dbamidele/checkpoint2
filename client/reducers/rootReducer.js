import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';

export default combineReducers({
  auth,
  documents
});
