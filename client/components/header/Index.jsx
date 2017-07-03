import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import logoutAction from '../../actions/logoutAction';
import { deleteDocuments } from '../../actions/documentsAction';


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
    super(props);
    this.state = {
      isAuthenticated: false,
      user: {}
    };
    // this.isLoggedIn = this.isLoggedIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.logoutAction = this.props.logoutAction;
    this.deleteDocuments = this.props.deleteDocuments;
  }

  /**
   * Runs when the component is rendering
   * @method componentWillMount
   * @returns {void}
   * @memberOf Header
   */
  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    this.setState({
      isAuthenticated,
      user
    });
  }

  /**
   * Update state on component update
   * @method componentWillReceiveProps
   * @param {any} nextProps
   * @return {void} - set new state
   * @memberOf Header
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuthenticated: nextProps.auth.isAuthenticated,
      user: nextProps.auth.user,
    });
  }

  /**
   * Call the action that logs a user out
   * @method logUserOut
   * @param {event} e
   * @returns {void}
   * @memberOf Header
   */
  logUserOut(e) {
    e.preventDefault();
    this.logoutAction().then(() => {
      this.deleteDocuments();
      this.props.history.push('/');
    });
  }


  /**
   * Renders the component
   * @method render
   * @returns {void}
   * @memberOf Header
   */
  render() {
    const loggedIn = this.state.isAuthenticated;
    const user = this.state.user;
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
                    <li>Welcome, {user.username}</li>
                    <li>
                      <a
                        href="/logout"
                        onClick={e => this.logUserOut(e)}
                      >Logout</a></li>
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
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

Header.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  logoutAction: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
{ logoutAction, deleteDocuments })(withRouter(Header));
