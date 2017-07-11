import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  searchDocuments
 } from '../../../actions/documentsAction';

/**
 * Creates the document header
 * @class DocHeader
 * @extends {React.Component}
 */
class DocHeader extends React.Component {
  /**
   * Creates an instance of DocHeader.
   * @param {any} props
   * @memberOf DocHeader
   */
  constructor(props) {
    super(props);
    this.state = {
      access: 'Public'
    };
    this.searchDoc = this.searchDoc.bind(this);
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
   * Calls the searchDocuments action to query
   * the database
   * @method searchDoc
   * @param {object} e - event
   * @return {void}
   * @memberOf DocHeader
   */
  searchDoc(e) {
    this.props.searchDocuments(e.target.value);
  }

  /**
   * Renders the component
   * @method render
   * @returns {void}
   * @memberOf DocHeader
   */
  render() {
    const filter = this.state.access;
    return (
      <div className="doc-header">
        <div className="row">
          <div className="col s12 m5 l3">
            <p>Showing {filter} documents</p>
          </div>
          <div className="col s12 m7 l5">
            <div className="pr-20">
              <input
                type="text"
                className="broswer-default search-box"
                placeholder="Search for documents..."
                onChange={this.searchDoc}
              />
            </div>
          </div>
          <div className="col s12 m12 l4">
            <select className="browser-default" name="access" id="access">
              <option value="all">All Documents</option>
              <option value="public">Public Documents</option>
              <option value="private">Private Documents</option>
              <option value="role">Role Based Documents</option>
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
  searchDocuments: PropTypes.func.isRequired
};

const mapPropsToState = state => (
  {
    auth: state.auth
  }
);

export default connect(mapPropsToState, {
  searchDocuments
})(withRouter(DocHeader));
