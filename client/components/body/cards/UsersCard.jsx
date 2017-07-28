import React from 'react';
import PropTypes from 'prop-types';

const UserCard = (props) => {
  const { user, editUser, deleteUserCard, onChange } = props;
  const { id, fullname, roleId } = user;
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title grey-text text-darken-4">
          {fullname}
          <span className="right">
            <span className="activator">
              <i className="material-icons">mode_edit</i>
            </span>
            <i
              className="material-icons"
              onClick={() => deleteUserCard(id)}
              id="deleteUser"
            >delete_forever</i>
          </span>
        </span>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          <div className="row">
            <div className="col s7">
              <select
                name="editedRole"
                id="editedRole"
                className="browser-default"
                defaultValue={roleId}
                onChange={onChange}
              >
                <option value="1"> Admin </option>
                <option value="2"> Regular </option>
              </select>
            </div>
            <div className="col s4">
              <span
                className="btn"
                onClick={() => editUser(id)}
                id="editUser"
              >Change Role</span>
            </div>
            <div className="col s1">
              <i className="material-icons right">close</i></div>
          </div>
        </span>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roleId: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired
  }).isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUserCard: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserCard;
