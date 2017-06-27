import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './login/LoginForm';
import SignupForm from './login/SignupForm';

/**
 * Creates Login page
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {
  /**
   * Creates an instance of LoginPage.
   * @param {any} props
   * @memberOf LoginPage
   */
  constructor(props) {
    super(props);
    this.state = {

    };
    this.loginAction = this.props.loginAction;
    this.signUpAction = this.props.signUpAction;
  }

  /**
   * Renders Login page
   * @method render
   * @returns {void}
   * @memberOf LoginPage
   */
  render() {
    return (
      <div className="row login-page-wrapper">
        <div className="content">
          <div className="col s12 m6 l6 xl6">
            <LoginForm loginAction={this.loginAction} />
            <div className="clear" />
          </div>

          <div className="col s12 m6 l6 xl6">
            <SignupForm signUpAction={this.signUpAction} />
            <div className="clear" />
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  signUpAction: PropTypes.func.isRequired
};

export default LoginPage;
