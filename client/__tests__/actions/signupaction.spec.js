import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import signUpAction from '../../actions/signUpAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
describe('Login Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Signup Action', () => {
    it('registers a new user', (done) => {
      const store = mockStore({});
      moxios.stubRequest('/api/users', {
        status: 200,
        response: {
          token: 'jdsefefrefreferff'
        }
      });
      signUpAction({ fullname: 'daniel' })(store.dispatch);
      done();
    });
  });
});
