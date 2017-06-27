import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = (props) => {
  // get the authentication status of the user
  // and display a nav bar based on that
  const { loggedIn, userDetails } = props;
  const username = userDetails.username;
  return (
    <div className="header-div">
      <nav>
        <div className="nav-wrapper">
          <span>
            <Link to="/" className="brand-logo">Dokuments&trade;</Link>
          </span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {
              loggedIn ? (
                <div>
                  <li>Welcome, {username}</li>
                  <li><Link to="/logout">Logout</Link></li>
                </div>
              ) : (
                <div>
                  <li><Link to="/documents">Get Started</Link></li>
                </div>
              )
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

// validate props
Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userDetails: PropTypes.shape({}),
};

// set default prop types
Navigation.defaultProps = {
  userDetails: { username: 'Guest' },
};

export default Navigation;
