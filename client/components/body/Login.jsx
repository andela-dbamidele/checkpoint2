import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginFormComponent } from './login/LoginForm';
import { SignupFormComponent } from './login/SignupForm';
import signUpAction from '../../actions/signUpAction';
import loginAction from '../../actions/loginAction';

/**
 * Creates Login page
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
   * Creates an instance of Login.
   * @param {any} props
   * @memberOf Login
   */
  constructor(props) {
    super(props);
    this.state = {

    };
    this.loginAction = this.props.loginAction;
    this.signUpAction = this.props.signUpAction;
  }

  /**
   * Check if the user is authenticated
   * when component is loaded
   * @method componentDidMount
   * @return {void}
   * @memberOf Login
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/documents');
    }
    $('ul.tabs').tabs();
  }

  /**
   * Renders Login page
   * @method render
   * @returns {void}
   * @memberOf Login
   */
  render() {
    return (
      <div className="row login-page-wrapper">
        <div className="home-div">
          <div className="col s12 home-inner light-color" id="notFound">
            <div className="inner-content m-auto">
              <div className="content">
                <ul className="tabs">
                  <li className="tab col s6"><a href="#loginform">Login</a></li>
                  <li id="registerlink" className="tab col s6">
                    <a href="#registerform">Register</a>
                  </li>
                </ul>
                <div id="loginform" className="col s12">
                  <LoginFormComponent loginAction={this.loginAction} />
                  <div className="clear" />
                </div>
                <div id="registerform" className="col s12">
                  <SignupFormComponent signUpAction={this.signUpAction} />
                  <div className="clear" />
                </div>
                <div className="clear" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  signUpAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired
};

const mapPropsToState = state => (
  {
    auth: state.auth
  }
);

export default connect(mapPropsToState,
{ signUpAction, loginAction })(withRouter(Login));
