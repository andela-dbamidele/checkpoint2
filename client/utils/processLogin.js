import jwt from 'jsonwebtoken';
import setAuthorizationToken from './setAuthorizationToken';
import saveCurrentUser from '../actions/saveCurrentUser';

const processLogin = (token, dispatch) => {
  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);
  dispatch(saveCurrentUser(jwt.decode(token)));
};

export default processLogin;
