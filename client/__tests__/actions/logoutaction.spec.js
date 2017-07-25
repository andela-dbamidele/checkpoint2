import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as ActionTypes from '../../actions/type';
import logoutAction from '../../actions/logoutAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Logout Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('logs a user out', (done) => {
    moxios.stubRequest('/auth/users/logout', {
      status: 200
    });

    const store = mockStore({});
    store.dispatch(logoutAction()).then(() => {
      expect(store.getActions()[0].type)
      .toEqual(ActionTypes.SET_CURRENT_USER);
    });
    done();
  });
});
