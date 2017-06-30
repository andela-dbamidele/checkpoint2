import React from 'react';
import Parser from 'html-react-parser';
// import TinyMCE from 'react-tinymce';
import swal from 'sweetalert2';
// import CKeditor from 'ckeditor';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDocument, getDocuments } from '../../../actions/documentsAction';
import SingleDoc from './SingleDoc';

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
    this.state = {
      title: '',
      content: '',
      access: 0,
      errors: {},
      documents,
    };
    this.openModal = this.openModal.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.cancelDocument = this.cancelDocument.bind(this);
    this.setDocumentToState = this.setDocumentToState.bind(this);
  }

  /**
   * Runs when the component is fully loaded
   * @method componentDidMount
   * @return {void}
   * @memberOf DocListing
   */
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      CKEDITOR.config.height = 400;
      CKEDITOR.replace('editor').on('change', (evt) => {
        // getData() returns CKEditor's HTML content.
        this.handleEditorChange(evt.editor.getData());
      });
      this.props.getDocuments()
      .then(() => {
        //
      });
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
    this.setDocumentToState(nextProps.documents);
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
    .then(() => {
      swal(
        'Success',
        'Document saved successfully!',
        'success'
      ).then(() => {
        $('body #modal1').modal('close');
      });
    },
    ({ response }) => {
      this.setState({
        errors: response.data,
      });
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
          <div className="col s12 m4 l3 xl3">
            <div className="card" onClick={() => this.openModal()}>
              <div className="card-image">
                <img src="/imgs/add2.png" alt="" />
              </div>
              <div className="card-action">
                <p>Create New Document</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
          {Display}
          <div className="clear" />
        </div>
        { Parser('<section id="foo" class="bar baz"' +
        ' data-qux="42">look at me now</section>') }
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
                    <option disabled>Select Document Access</option>
                    <option value="0">Public</option>
                    <option value="1">Private</option>
                    <option value="2">Role Based</option>
                  </select>
                </div>
                <div className="clear" />
              </div>
              <div className="clear" />
            </div>
            <textarea
              name="editor"
              id="editor"
              cols=""
              rows="10"
              className="browser-defaults"
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
  documents: PropTypes.arrayOf(PropTypes.object).isRequired
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
};

const mapPropsToState = state => (
  {
    auth: state.auth,
    documents: state.documents
  }
);

export default connect(mapPropsToState,
{ createDocument, getDocuments })(withRouter(DocListing));
