import axios from 'axios';
import { GET_ALL_USERS,
  CREATE_USER_ERROR
} from './type';

const addUsersToState = users => (
  {
    type: GET_ALL_USERS,
    users
  }
);

const setError = errors => (
  {
    type: CREATE_USER_ERROR,
    errors
  }
);

/**
 * Get all the users
 * @function getUsers
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {void}
 */
export function getUsers(offset = 0, limit = 10) {
  return dispatch => (
    axios.get('/api/users', {
      params: {
        offset,
        limit
      }
    })
  )
  .then((response) => {
    dispatch(addUsersToState(response.data));
  });
}

/**
 * Updates a particular user's role
 * @function editUserRole
 * @export
 * @param {number} userId - user's id
 * @param {number} roleId - new role id
 * @returns {void}
 */
export function editUserRole(userId, roleId) {
  return dispatch => (
    axios.put(`/api/users/${userId}`, {
      roleId
    })
  ).then(() => {
    //
  }, ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}

/**
 * Deletes a particular user
 * @function deleteUser
 * @export
 * @param {number} id - id of the user
 * @returns {void}
 */
export function deleteUser(id) {
  return dispatch => (
    axios.delete(`/api/users/${id}`)
  )
  .then(() => {
    //
  }, ({ response }) => {
    dispatch(setError(response.data));
    return true;
  });
}
