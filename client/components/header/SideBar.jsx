import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const SideBar = ({ user, logUserOut }) => (
  <div id="sidebar">
    {
      !isEmpty(user) ? (
        <ul id="slide-out" className="side-nav">
          <li>
            <a>
              <h5 className="center pt-10"><strong>Site Actions</strong></h5>
            </a>
          </li>
          <li><div className="divider" /></li>
          <li>
            <a href="/users">
              <i className="material-icons">people</i> Manage Users
            </a>
          </li>
          <li><div className="divider" /></li>
          <li>
            <a href="#!">
              <i className="material-icons">swap_vert</i>
            Manage Roles
            </a>
          </li>
          <li><div className="divider" /></li>
          <li>
            <a
              id="logout"
              href="/logout"
              onClick={e => logUserOut(e)}
            ><i className="material-icons">lock</i>Logout</a></li>
          <li><div className="divider" /></li>
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
