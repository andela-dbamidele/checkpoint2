import React from 'react';
import PropTypes from 'prop-types';

/**
 * Creates sign up form component
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * Creates an instance of SignupForm.
   * @param {any} props
   * @memberOf SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * Bind the value of the inputs to state
   * @method onChange
   * @param {any} e
   * @return {void}
   * @memberOf SignupForm
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
   * @memberOf SignupForm
   */
  submitForm(e) {
    e.preventDefault();
    const { signUpAction } = this.props;
    signUpAction(this.state);
  }

  /**
   * Renders react component
   * @method render
   * @returns {void}
   * @memberOf SignupForm
   */
  render() {
    return (
      <div className="row">
        <h3>Register</h3>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                name="fullname"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Full Name</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">face</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                name="username"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Username</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input
                id="icon_prefix"
                type="email"
                className="validate"
                name="email"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Email</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="icon_prefix"
                type="password"
                className="validate"
                name="password"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Password</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                id="icon_prefix"
                type="password"
                className="validate"
                name="passwordConfirmation"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Confirm Password</label>
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

SignupForm.propTypes = {
  signUpAction: PropTypes.func.isRequired
};

export default SignupForm;
