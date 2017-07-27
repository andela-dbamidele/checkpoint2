import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LoginAction from '../../actions/loginAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
describe('Login Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Login Action', () => {
    it('Logs a user in', (done) => {
      const store = mockStore({});
      moxios.stubRequest('/auth/users/login', {
        status: 200,
        response: {
          token: 'jdsefefrefreferff'
        }
      });
      LoginAction({ identifier: 'daniel' })(store.dispatch);
      done();
    });
  });
});
