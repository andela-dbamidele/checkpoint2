import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/type';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case REMOVE_CURRENT_USER:
      return {
        isAuthenticated: false,
        user: {}
      };
    default: return state;
  }
};
