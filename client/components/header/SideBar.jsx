import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const SideBar = ({ user, logUserOut }) => (
  <div>
    {
      !isEmpty(user) ? (
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <a href="#!name">
                <span className="white-text name">{ user.fullname }</span>
              </a>
              <a href="#!email">
                <span className="white-text email">{ user.email }</span>
              </a>
            </div>
          </li>
          <li>
            <a href="/users">
              <i className="material-icons">cloud</i>Manage Users
            </a>
          </li>
          <li><div className="divider" /></li>
          <li><a href="/roles">Manage Roles</a></li>
          <li>
            <a
              href="/logout"
              onClick={e => logUserOut(e)}
            >Logout</a></li>
        </ul>
      ) : (
        <div>
          <li><Link to="/documents">Get Started</Link></li>
        </div>
      )
    }
    <div className="clear" />
  </div>
);

SideBar.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  logUserOut: PropTypes.func.isRequired,
};

export default SideBar;
