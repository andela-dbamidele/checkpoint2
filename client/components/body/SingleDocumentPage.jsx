import React from 'react';
import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import {
  setSingleDocument,
  updateDocument
} from '../../actions/documentsAction';
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
      user: this.props.auth,
      editorOpen: false,
      editedAccess: this.props.document.access,
      editedTitle: this.props.document.title,
      errors: this.props.errors
    };
    this.addEditor = this.addEditor.bind(this);
    this.removeEditor = this.removeEditor.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Gets the id of the current document from the url
   * and get the details from the database
   * @method componentDidMount
   * @return {void}
   * @memberOf SingleDocumentPage
   */
  componentDidMount() {
    const { match } = this.props;
    this.props.setSingleDocument(match.params.id);
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
   * Renders component to the view
   * @method render
   * @returns {void}
   * @memberOf SingleDocumentPage
   */
  render() {
    const { document, user, editorOpen } = this.state;
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
          user.id === document.userId &&
          <div className="editorTools">
            { editorOpen ? (
              <div>
                <span onClick={this.saveChanges}>
                  <i className="material-icons">save</i>
                </span>
                <span onClick={this.removeEditor}>
                  <i className="material-icons">cancel</i>
                </span>
              </div>
            ) : (
              <span onClick={this.addEditor}>
                <i className="material-icons">mode_edit</i>
              </span>
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
                    <span>{accessName[document.access]}</span> document
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
      id: PropTypes.number.isRequired,
      roleId: PropTypes.number.isRequired
    })
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({
    document: PropTypes.shape({})
  }).isRequired,
  setSingleDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.auth.user,
    document: state.singleDocument,
    errors: state.errors
  }
);

export default connect(mapStateToProps,
{ setSingleDocument, updateDocument })(SingleDocumentPage);
