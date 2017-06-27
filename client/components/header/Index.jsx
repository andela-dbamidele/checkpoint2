import React from 'react';
import Navigation from './Navigation';

/**
 * Creates Header Component
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * Creates an instance of Header.
   * @param {any} props
   * @returns {void}
   * @memberOf Header
   */
  constructor(props) {
    super();
  }

  /**
   * Check if user is logged in
   * @method isLoggedIn
   * @returns {boolean} -
   * @memberOf Header
   */
  isLoggedIn() {
    //
  }

  /**
   * Renders the component
   * @method render
   * @returns {void}
   * @memberOf Header
   */
  render() {
    return (
      <div>
        <Navigation loggedIn={true} userDetails={{ 'username': 'daniel' }} />
      </div>
    );
  }
}

export default Header;
