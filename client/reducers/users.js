import { GET_ALL_USERS } from '../actions/type';

const initialState = {
  rows: [],
  count: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        rows: action.users.rows,
        count: action.users.count
      };
    default: return state;
  }
};
