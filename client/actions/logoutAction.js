import axios from 'axios';
import saveCurrentUser from '../actions/saveCurrentUser';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const logoutAction = () => (
    dispatch => (axios.post('/auth/users/logout'))
    .then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(saveCurrentUser({}));
    })
);

export default logoutAction;
