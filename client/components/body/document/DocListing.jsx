import React from 'react';
// import TinyMCE from 'react-tinymce';
import swal from 'sweetalert2';
// import CKeditor from 'ckeditor';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import ReactPaginate from 'react-paginate';
import { createDocument,
  getDocuments,
 } from '../../../actions/documentsAction';
import SingleDoc from './SingleDoc';
import TinyMceComponent from './TinyMceComponent';

/**
 * Creates DocListing component
 * @class DocListing
 * @extends {React.Component}
 */
class DocListing extends React.Component {
  /**
   * Creates an instance of DocListing.
   * @param {object} props -
   * @return {void}
   * @memberOf DocListing
   */
  constructor(props) {
    super(props);
    const { documents } = this.props;
    this.docsPerPage = 11;
    this.state = {
      title: '',
      content: '',
      access: 1,
      errors: this.props.errors,
      documents: documents.rows,
      pageCount: Math.ceil(documents.count / this.docsPerPage),
      offset: 0
    };
    this.openModal = this.openModal.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.cancelDocument = this.cancelDocument.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    // this.setDocumentToState = this.setDocumentToState.bind(this);
  }

  /**
   * Runs when the component is fully loaded
   * @method componentDidMount
   * @return {void}
   * @memberOf DocListing
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getDocuments();
    }
  }

  /**
   * Runs when new props are passed in
   * @method componentWillReceiveProps
   * @param {any} nextProps
   * @return {void}
   * @memberOf DocListing
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents.rows,
      errors: nextProps.errors,
      pageCount: Math.ceil(nextProps.documents.count / this.docsPerPage)
    });
  }


  /**
   * Handles change event to the form component
   * @method onChange
   * @param {any} e -
   * @return {void}
   * @memberOf DocListing
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  /**
   * Sets documents to state
   * @method setDocumentToState
   * @param {array} doc -
   * @return {void}
   * @memberOf DocListing
   */
  setDocumentToState(doc) {
    this.setState({
      documents: doc,
    });
  }

  /**
   * Set content of the editor to the state
   * @method handleEditorChange
   * @param {string} content -
   * @return {void} - set new state
   * @memberOf DocListing
   */
  handleEditorChange(content) {
    this.setState({
      content,
    });
  }

  /**
   * Open editor modal
   * @method openModal
   * @return {void}
   * @memberOf DocListing
   */
  openModal() {
    $('.modal').modal({
      dismissible: false,
    });
    $('body #modal1').modal('open');
  }

  /**
   * Make ajax request to the server to
   * to save document
   * @method saveDoument
   * @return {void}
   * @memberOf DocListing
   */
  saveDocument() {
    const document = {};
    const { user } = this.props.auth;
    document.title = this.state.title;
    document.content = this.state.content;
    document.access = this.state.access;
    document.author = user.fullname;
    document.userId = user.id;
    document.roleId = user.roleId;
    this.props.createDocument(document)
    .then((response) => {
      if (isEmpty(response)) {
        swal(
          'Success',
          'Document saved successfully!',
          'success'
        ).then(() => {
          $('body #modal1').modal('close');
        });
      } else {
        let errors = '';
        _.forEach(this.state.errors.document, (value, key) => {
          errors += `<li key={${key}}>${value}</li>`;
        });
        swal({
          type: 'error',
          html: `${errors}`,
          showCloseButton: true,
          confirmButtonText:
            'Ok',
        });
      }
    });
  }

  /**
   * Handles cancel document click function
   * @method cancelDocument
   * @return {void}
   * @memberOf DocListing
   */
  cancelDocument() {
    if (this.state.title !== '' ||
      this.state.content !== ''
    ) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to recover your changes!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(() => {
        $('body #modal1').modal('close');
        tinymce.activeEditor.setContent('');
        this.setState({
          title: '',
          content: '',
          access: 0,
          errors: {}
        });
      });
    } else {
      $('body #modal1').modal('close');
    }
  }

  /**
   * Handles pagination
   * @method handlePageClick
   * @param {any} data
   * @return {void}
   * @memberOf DocListing
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.docsPerPage);

    this.setState({ offset }, () => {
      this.props.getDocuments(this.state.offset);
    });
  }

  /**
   * Renders JSX component
   * @method render
   * @returns {void} - component
   * @memberOf DocListing
   */
  render() {
    const { errors, documents } = this.state;
    const Display = documents.map(doc => (
      <SingleDoc
        id={doc.id}
        title={doc.title}
        date={doc.date}
        type="docs"
        access={doc.access}
        key={doc.title}
      />
    ));
    return (
      <div className="row">
        <div>
          <div className="col s6 m4 l3 xl3">
            <div className="card" onClick={() => this.openModal()}>
              <div className="card-image">
                <img src="/imgs/add2.png" alt="" />
              </div>
              <div className="card-action">
                <p className="truncate">Create New Document</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
          {Display}
          <div className="clear" />
        </div>
        <div className="row">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
        <div id="modal1" className="modal modal-fixed-footer">
          <div className="modal-content">
            {
              errors.message &&
              <div className="errors">
                <h5>{ errors.message }</h5>
              </div>
            }
            <div className="title">
              <div className="row">
                <div className="col s12 m7 l8 xl8">
                  <input
                    type="text"
                    value={this.state.title}
                    name="title"
                    onChange={this.onChange}
                    placeholder="Enter Document Title"
                  />
                </div>
                <div className="col s12 m5 l4 xl4">
                  <select
                    className="browser-default"
                    name="access"
                    id="access"
                    onChange={this.onChange}
                  >
                    <option
                      defaultValue=""
                      disabled
                    >Select Document Access</option>
                    <option value="0">Public</option>
                    <option value="1">Private</option>
                    <option value="2">Role Based</option>
                  </select>
                </div>
                <div className="clear" />
              </div>
              <div className="clear" />
            </div>
            <TinyMceComponent
              id="tinymce"
              handleEditorChange={this.handleEditorChange}
              content={this.state.content}
            />
          </div>
          <div className="modal-footer">
            <span
              id="closeModal"
              className="modal-action waves-effect waves-green btn-flat"
              onClick={() => this.cancelDocument()}
            >Cancel
            </span>
            <span
              id="saveDocument"
              className="modal-action waves-effect waves-green btn-flat"
              onClick={this.saveDocument}
            >Save
            </span>
          </div>
          <div className="clear" />
        </div>
        <div className="clear" />
      </div>
    );
  }
}

DocListing.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      fullname: PropTypes.string,
      username: PropTypes.string,
      roleId: PropTypes.number,
    }),
  }).isRequired,
  createDocument: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  documents: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    document: PropTypes.shape({})
  }),
};

DocListing.defaultProps = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: null,
      fullname: null,
      username: null,
      roleId: null,
    }),
  }),
  errors: PropTypes.shape({
    document: {}
  }),
};

const mapPropsToState = state => (
  {
    auth: state.auth,
    documents: state.documents,
    errors: state.errors
  }
);

export default connect(mapPropsToState,
  { createDocument,
    getDocuments,
  })(withRouter(DocListing));
