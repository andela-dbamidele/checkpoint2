import React from 'react';
import tinymce from 'tinymce';
import TinyMCE from 'react-tinymce';
import Parser from 'html-react-parser';
import swal from 'sweetalert2';
import SingleDoc from './SingleDoc';

/**
 * Creates DocListing component
 * @export
 * @class DocListing
 * @extends {React.Component}
 */
export default class DocListing extends React.Component {
  /**
   * Creates an instance of DocListing.
   * @param {object} props -
   * @return {void}
   * @memberOf DocListing
   */
  constructor(props) {
    super(props);
    this.state = {
      docTitle: '',
      docContent: '',
      docAccess: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.cancelDocument = this.cancelDocument.bind(this);
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
   * Set content of the editor to the state
   * @method handleEditorChange
   * @param {event} e -
   * @return {void} - set new state
   * @memberOf DocListing
   */
  handleEditorChange(e) {
    this.setState({
      docContent: e.target.getContent(),
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
    //
  }

  /**
   * Handles cancel document click function
   * @method cancelDocument
   * @return {void}
   * @memberOf DocListing
   */
  cancelDocument() {
    if (this.state.docTitle !== '' ||
      this.state.docContent !== ''
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
          docTitle: '',
          docContent: '',
          docAccess: 0,
        });
        tinymce.activeEditor.setContent('');
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
    const dummy = [
      { id: 1, title: 'Hello', date: '21 July', access: '0' },
      { id: 2, title: 'World', date: '21 July', access: '1' },
      { id: 3, title: 'Hello World', date: '21 July', access: '1' },
      { id: 4, title: 'Big Day', date: '21 July', access: '1' }
    ];
    const Display = dummy.map(doc => (
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
            <div className="title">
              <div className="row">
                <div className="col s12 m7 l8 xl8">
                  <input
                    type="text"
                    value={this.state.docTitle}
                    name="docTitle"
                    onChange={this.onChange}
                    placeholder="Enter Document Title"
                  />
                </div>
                <div className="col s12 m5 l4 xl4">
                  <select
                    className="browser-default"
                    name="docAccess"
                    id="docAccess"
                    onChange={this.onChange}
                  >
                    <option value="" disabled>Select Document Access</option>
                    <option value="0">Public</option>
                    <option value="1">Private</option>
                    <option value="2">Role Based</option>
                  </select>
                </div>
                <div className="clear" />
              </div>
              <div className="clear" />
            </div>
            <TinyMCE
              content={this.state.docContent}
              config={{
                plugins: 'autolink link image lists' +
                ' print preview textcolor table emoticons codesample',
                toolbar: 'undo redo | bold italic | ' +
                'fontsizeselect fontselect | ' +
                'alignleft aligncenter alignright | forecolor backcolor' +
                '| table | numlist bullist | emoticons | codesample',
                table_toolbar: 'tableprops tabledelete ' +
                '| tableinsertrowbefore ' +
                'tableinsertrowafter tabledeleterow | tableinsertcolbefore ' +
                'tableinsertcolafter tabledeletecol',
                fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
              }}
              onChange={this.handleEditorChange}
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
              onClick={() => this.saveDocument()}
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
