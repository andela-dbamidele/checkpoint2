import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import SignupForm from './login/SignupForm';
import signUpAction from '../../actions/signUpAction';
import loginAction from '../../actions/loginAction';

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
   * Check if the user is authenticated
   * when component is loaded
   * @method componentDidMount
   * @return {void}
   * @memberOf LoginPage
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/documents');
    }
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
{ signUpAction, loginAction })(withRouter(LoginPage));
