import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  searchDocuments,
  getDocuments
 } from '../../../actions/documentsAction';

/**
 * Creates the document header
 * @class DocHeader
 * @extends {React.Component}
 */
export class DocHeader extends React.Component {
  /**
   * Creates an instance of DocHeader.
   * @param {any} props
   * @memberOf DocHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      access: 0
    };
    this.searchDoc = this.searchDoc.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Runs when the component is fully loaded
   * @method componentDidMount
   * @return {void}
   * @memberOf DocHeader
   */
  componentDidMount() {
    // redirect the user to login page
    // if he/she is not authenticated
    if (!this.props.auth.isAuthenticated) {
      const requestedLocation = this.props.location.pathname;
      this.props.history.push(`/login?redirect=${requestedLocation}`);
    }
    $('.button-collapse').sideNav();
  }

  /**
   * Set's value of access to state
   * @method onChange
   * @param {event} e
   * @return {void}
   * @memberOf DocHeader
   */
  onChange(e) {
    this.setState({
      [e.target.name]: parseInt(e.target.value, 0)
    }, () => {
      this.props.getDocuments(this.state.access);
    });
  }

  /**
   * Calls the searchDocuments action to query
   * the database
   * @method searchDoc
   * @param {object} e - event
   * @return {void}
   * @memberOf DocHeader
   */
  searchDoc(e) {
    if (e.target.value !== '') {
      this.props.searchDocuments(e.target.value, this.state.access);
    } else {
      this.props.getDocuments(this.state.access);
    }
  }

  /**
   * Renders the component
   * @method render
   * @returns {void}
   * @memberOf DocHeader
   */
  render() {
    const filter = this.state.access;
    const accessFields = [
      'Public',
      'Private',
      'Role'
    ];
    return (
      <div className="doc-header">
        <div className="row mt-20">
          <div className="col s12 m5 l3">
            <p
              className="currentFilter"
            >Showing {accessFields[filter]} documents</p>
          </div>
          <div className="col s12 m7 l5">
            <div className="pr-20">
              <input
                type="text"
                id="searchDocs"
                className="broswer-default search-box"
                placeholder={`Search for ${accessFields[filter]} documents`}
                onChange={this.searchDoc}
              />
            </div>
          </div>
          <div className="col s12 m12 l4">
            <select
              className="browser-default"
              name="access"
              id="access"
              defaultValue="0"
              onChange={this.onChange}
            >
              <option value="0">Public Documents</option>
              <option value="1">Private Documents</option>
              <option value="2">Role Based Documents</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

DocHeader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  searchDocuments: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired
};

const mapPropsToState = state => (
  {
    auth: state.auth
  }
);

const Header = connect(mapPropsToState, {
  searchDocuments,
  getDocuments
})(withRouter(DocHeader));

export { Header as DocumentHeader };
