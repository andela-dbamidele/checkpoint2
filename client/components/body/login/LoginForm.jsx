import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
/**
 * Creates Login form component
 * @class LoginForm
 * @extends {React.Component}
 */
class LoginForm extends React.Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * Bind the value of the inputs to state
   * @method onChange
   * @param {any} e
   * @return {void}
   * @memberOf LoginForm
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * Submit the form
   * @method submitForm
   * @param {object} e
   * @return {void}
   * @memberOf LoginForm
   */
  submitForm(e) {
    e.preventDefault();
    this.setState({
      errors: {}
    });
    const { loginAction } = this.props;
    loginAction(this.state).then(() => {
      const requestedLocation = queryString.parse(this.props.location.search);
      this.props.history.push(requestedLocation.redirect || '/documents');
    })
    .catch(({ response }) => {
      this.setState({
        errors: {
          message: response.data.message
        }
      });
    });
  }

  /**
   * Renders react component
   * @method render
   * @returns {void}
   * @memberOf LoginForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="row p-t-50">
        <h3>Login</h3>
        { errors.message &&
          <div className="errors">
            <h5>{errors.message}</h5>
          </div>
        }
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                name="identifier"
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix">Username</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="icon_prefix"
                type="password"
                className="validate"
                name="password"
                onChange={this.onChange}
              />
              <label htmlFor="icon_prefix">Password</label>
            </div>

            <div className="input-field">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.submitForm}
              >Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};


export default withRouter(LoginForm);
