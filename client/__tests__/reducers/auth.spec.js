import authReducer from '../../reducers/auth';
import * as ActionTypes from '../../actions/type';

const initialState = {
  isAuthenticated: false,
  user: {}
};

describe('Auth reducer', () => {
  describe('CASE: SET_CURRENT_USER', () => {
    it('sets authenticated to true and save users details', () => {
      const user = {
        id: 1,
        fullname: 'Danny Ship',
      };
      const action = {
        type: ActionTypes.SET_CURRENT_USER,
        user
      };
      const expected = {
        isAuthenticated: true,
        user
      };
      const newState = authReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('CASE: REMOVE_CURRENT_USER', () => {
    it('removes user from store and change authenticateed to false', () => {
      const user = {};
      const action = {
        type: ActionTypes.REMOVE_CURRENT_USER,
        user
      };
      const expected = {
        isAuthenticated: false,
        user
      };
      const newState = authReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });

  describe('DEFAULT', () => {
    it('returns the state if action is not registed to the store', () => {
      const action = {
        type: 'HELLO_WORLD'
      };
      const expected = {
        isAuthenticated: false,
        user: {}
      };
      const newState = authReducer(initialState, action);
      expect(newState).toEqual(expected);
    });
  });
});
