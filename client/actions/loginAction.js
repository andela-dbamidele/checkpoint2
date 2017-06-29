import axios from 'axios';
import processLogin from '../utils/processLogin';

const loginAction = userData => (
  dispatch => (
    axios.post('/auth/users/login', userData)
  ).then(
    (response) => {
      processLogin(response.data.token, dispatch);
    }
  )
);

export default loginAction;
