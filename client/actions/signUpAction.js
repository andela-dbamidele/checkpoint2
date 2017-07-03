import axios from 'axios';
import processLogin from '../utils/processLogin';

const signUpAction = userData => (
  dispatch => (
    axios.post('/api/users', userData)
  ).then(
    (response) => {
      processLogin(response.data.token, dispatch);
    }
  )
);

export default signUpAction;

