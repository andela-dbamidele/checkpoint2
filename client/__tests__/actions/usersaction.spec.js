import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as ActionTypes from '../../actions/type';
import * as usersAction from '../../actions/usersAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Document Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Get Users action', () => {
    it('gets all the users and set to state', (done) => {
      moxios.stubRequest('/api/users?offset=0&limit=10', {
        status: 200,
        response: {
          users: [
            {
              id: 1,
              fullname: 'daniel'
            }
          ]
        }
      });

      const store = mockStore({});
      store.dispatch(usersAction.getUsers()).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.GET_ALL_USERS);
        expect(store.getActions()[0].users).toEqual(
          {
            users: [
              {
                id: 1,
                fullname: 'daniel'
              }
            ]
          }
        );
      });
      done();
    });
  });

  describe('Edit Role', () => {
    it('edits a users role', (done) => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          message: 'Role edited successfully'
        }
      });

      const store = mockStore({});
      store.dispatch(usersAction.editUserRole(1)).then(() => {
        //
      });
      done();
    });

    it('dispatch error action if there is any error', (done) => {
      moxios.stubRequest('/api/users/3000000', {
        status: 400,
        response: {
          message: 'Role not found'
        }
      });
      const store = mockStore({});
      store.dispatch(usersAction.editUserRole(3000000)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_USER_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'Role not found' }
        );
      });
      done();
    });
  });

  describe('Deletes user', () => {
    it('deletes a user successfully', (done) => {
      moxios.stubRequest('/api/users/1', {
        status: 200,
        response: {
          message: 'User deleted successfully'
        }
      });

      const store = mockStore({});
      store.dispatch(usersAction.deleteUser(1)).then(() => {
        //
      });
      done();
    });

    it('dispatch error action if there is any error', (done) => {
      moxios.stubRequest('/api/users/3000000', {
        status: 400,
        response: {
          message: 'User not found'
        }
      });
      const store = mockStore({});
      store.dispatch(usersAction.deleteUser(3000000)).then(() => {
        expect(store.getActions()[0].type)
        .toEqual(ActionTypes.CREATE_USER_ERROR);
        expect(store.getActions()[0].errors).toEqual(
          { message: 'User not found' }
        );
      });
      done();
    });
  });
});
