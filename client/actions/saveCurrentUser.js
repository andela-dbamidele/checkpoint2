import { SET_CURRENT_USER } from './type';

const saveCurrentUser = user => (
  {
    type: SET_CURRENT_USER,
    user
  }
);

export default saveCurrentUser;
