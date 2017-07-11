import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import {
  setSingleDocument,
  updateDocument,
  deleteSingleDocument
} from '../../actions/documentsAction';
import ErrorComponent from './ErrorComponent';
import tinymceConfig from '../tinymceConfig.json';

/**
 * Creates component that displays a document
 * @class SingleDocumentPage
 * @extends {React.Component}
 */
class SingleDocumentPage extends React.Component {
  /**
   * Creates an instance of SingleDocumentPage.
   * @param {any} props
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  constructor(props) {
    super(props);
    this.state = {
      document: {},
      editor: null,
      user: this.props.auth.user,
      editorOpen: false,
      editedAccess: this.props.document.access,
      editedTitle: this.props.document.title,
      errors: this.props.errors,
      loading: true,
      documentNotFound: false
    };
    this.addEditor = this.addEditor.bind(this);
    this.removeEditor = this.removeEditor.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Gets the id of the current document from the url
   * and get the details from the database
   * @method componentDidMount
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      const requestedLocation = this.props.location.pathname;
      this.props.history.push(`/login?redirect=${requestedLocation}`);
    } else {
      const { match } = this.props;
      this.props.setSingleDocument(match.params.id)
      .then((response) => {
        if (response) {
          this.setState({
            loading: false,
            documentNotFound: true
          });
        } else {
          this.setState({
            loading: false
          });
        }
      });
    }
  }

  /**
   * Listen to changes in the store and update
   * the state
   * @method componentWillReceiveProps
   * @param {object} nextProps
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      document: nextProps.document,
      editedAccess: nextProps.document.access,
      editedTitle: nextProps.document.title,
      errors: nextProps.errors
    });
  }

  /**
   * Remove the instance of tinymce after component\
   * unmounts
   * @method componentWillUnmount
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  componentWillUnmount() {
    tinymce.remove('#mainDiv');
  }

  /**
   * Listen to changes in the input element\
   * and change the state accordinly
   * @method onChange
   * @param {event} e
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /**
   * Set an instance of tinymce editor to
   * the div element
   * @method addEditor
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  addEditor() {
    tinymce.init(tinymceConfig);
    this.setState({
      editorOpen: true,
    });
  }

  /**
   * Removes instance of tiny mce from the component
   * @method removeEditor
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  removeEditor() {
    tinymce.remove('#mainDiv');
    this.setState({
      editorOpen: false,
    });
  }

  /**
   * Saves the changes made to the document to
   * the database
   * @method saveChanges
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  saveChanges() {
    const docId = this.state.document.id;
    const newDoc = {};
    newDoc.title = this.state.editedTitle;
    newDoc.content = tinymce.activeEditor.getContent();
    newDoc.access = this.state.editedAccess;
    newDoc.userId = this.state.document.userId;
    newDoc.roleId = this.state.document.roleId;
    this.props.updateDocument(docId, newDoc)
    .then((response) => {
      if (response) {
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
      } else {
        swal(
          'Success',
          'Document saved successfully!',
          'success'
        ).then(() => {
          this.removeEditor();
        });
      }
    });
  }

  /**
   * Deletes document from database
   * @method deleteDocument
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  deleteDocument() {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to recover the document",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      allowOutsideClick: false
    }).then(() => {
      this.props.deleteSingleDocument(this.state.document.id)
      .then((res) => {
        if (res) {
          swal({
            type: 'error',
            html: `${this.state.errors.document.message}`,
            showCloseButton: true,
            confirmButtonText:
              'Ok',
            allowOutsideClick: false
          });
        } else {
          swal(
            {
              type: 'success',
              html: 'Document deleted successfully!',
              title: 'Success',
              allowOutsideClick: false,
              showCloseButton: true,
              confirmButtonText:
                'Ok',
            }
          ).then(() => {
            this.props.history.push('/documents');
          });
        }
      });
    });
  }

  /**
   * Renders component to the view
   * @method render
   * @returns {void}
   * @memberOf SingleDocumentPage
   */
  render() {
    const { document,
      user,
      editorOpen,
      loading,
      documentNotFound,
      errors
    } = this.state;
    const accessName = ['Public', 'Private', 'Role'];
    const accessIcons = [
      'public',
      'lock',
      'supervisor_account'
    ];
    const accessOptions = accessName.map((value, index) => (
      <option key={index} value={index}> {value} </option>
    ));
    return (
      <div className="row single-document-wrapper">
        {
          loading ? (<h5>loading</h5>) : (
            <div>
              { documentNotFound ?
                (
                  <div>
                    {
                      errors.document.message ? (
                        <h5>
                          <ErrorComponent
                            errorMsg={errors.document.message}
                            errorType={403}
                          />
                        </h5>
                      ) : (
                        <h6>
                          <ErrorComponent
                            errorMsg={'System failure. Please try again Later!'}
                            errorType={400}
                          />
                        </h6>
                      )
                    }
                  </div>
                ) :
                (
                  <div>
                    {
                      user.id === document.userId &&
                      <div className="editorTools">
                        { editorOpen ? (
                          <div>
                            <span onClick={this.saveChanges}>
                              <i className="material-icons">save</i>
                            </span>
                            {/* <hr />
                            <span onClick={this.removeEditor}>
                              <i className="material-icons">cancel</i>
                            </span>*/}
                          </div>
                        ) : (
                          <div>
                            <span onClick={this.addEditor}>
                              <i className="material-icons">mode_edit</i>
                            </span>
                            <hr />
                            <span onClick={this.deleteDocument}>
                              <i className="material-icons">delete_forever</i>
                            </span>
                          </div>
                        )
                      }
                      </div>
                    }
                    <div className="content-wrap">
                      <div className="title">
                        {
                          !editorOpen && (
                            <h3 id="title">
                              {!isEmpty(document) && document.title}
                            </h3>
                          )
                        }
                        <p>
                          {
                            !editorOpen && (
                            <span>
                              <span>
                                <i className="material-icons">date_range</i>
                                {document.createdAt}
                              </span>
                              <span>
                                <i
                                  className="material-icons"
                                >
                                  {accessIcons[document.access]}
                                </i>
                                <span>
                                  {accessName[document.access]}
                                </span> document
                              </span>
                            </span>
                          )
                          }
                          <span>{
                            editorOpen && (
                              <span>
                                <input
                                  type="text"
                                  value={this.state.editedTitle}
                                  name="editedTitle"
                                  onChange={this.onChange}
                                  placeholder="Enter Document Title"
                                />
                                <select
                                  name="editedAccess"
                                  id="access"
                                  className="browser-default"
                                  value={this.state.editedAccess}
                                  onChange={this.onChange}
                                >
                                  {
                                    accessOptions
                                  }
                                </select>
                              </span>
                            )
                          }
                          </span>
                        </p>
                      </div>
                      <div className="content" id="mainDiv">
                        {!isEmpty(document) && Parser(document.content)}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
        <div className="clear" />
      </div>
    );
  }
}

SingleDocumentPage.propTypes = {
  document: PropTypes.shape({
    access: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.number,
    roleId: PropTypes.number,
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      roleId: PropTypes.number
    }),
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    document: PropTypes.shape({})
  }).isRequired,
  setSingleDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  deleteSingleDocument: PropTypes.func.isRequired,
};

SingleDocumentPage.defaultProps = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: '',
      roleId: '',
    })
  })
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    document: state.singleDocument,
    errors: state.errors
  }
);

export default connect(mapStateToProps,
  {
    setSingleDocument,
    updateDocument,
    deleteSingleDocument
  })(withRouter(SingleDocumentPage));
