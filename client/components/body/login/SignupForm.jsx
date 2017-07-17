import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import validateInput from '../../../../server/shared/validators/usersData';

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
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.validateData = this.validateData.bind(this);
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
   * Validates useer's data before making
   * post request
   * @method validateData
   * @returns {boolean} -
   * @memberOf SignupForm
   */
  validateData() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors, });
    }

    return isValid;
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
    this.setState({
      errors: {}
    });
    const { signUpAction } = this.props;
    if (this.validateData()) {
      signUpAction(this.state).then(
      () => {
        this.props.history.push('/documents');
      },
      ({ response }) => {
        this.setState({
          errors: response.data,
        });
      });
    }
  }

  /**
   * Renders react component
   * @method render
   * @returns {void}
   * @memberOf SignupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <h3>Register</h3>
        { errors.message &&
          <div className="errors">
            <h5>{errors.message}</h5>
          </div>
        }
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="fullname"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Full Name</label>
              { errors.fullname && <p>{errors.fullname}</p> }
            </div>

            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="username"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Username</label>
              { errors.username && <p>{errors.username}</p> }
            </div>

            <div className="input-field col s12">
              <input
                type="email"
                className="validate"
                name="email"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Email</label>
              { errors.email && <p>{errors.email}</p> }
            </div>

            <div className="input-field col s12">
              <input
                type="password"
                className="validate"
                name="password"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Password</label>
              { errors.password && <p>{errors.password}</p> }
            </div>

            <div className="input-field col s12">
              <input
                type="password"
                className="validate"
                name="passwordConfirmation"
                onChange={this.onChange}
                required
              />
              <label htmlFor="icon_prefix">Confirm Password</label>
              { errors.passwordConfirmation &&
                <p>{errors.passwordConfirmation}</p> }
            </div>

            <div className="input-field">
              <button
                className="btn waves-effect waves-light left btn-color"
                type="submit"
                name="action"
                onClick={this.submitForm}
              >REGISTER NOW
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
  signUpAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default withRouter(SignupForm);
