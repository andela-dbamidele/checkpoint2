import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * TinyMce react component class
 * @class TinyMceComponent
 * @extends {Component}
 */
class TinyMceComponent extends Component {
  /**
   * Creates an instance of TinyMceComponent.
   * @memberOf TinyMceComponent
   */
  constructor() {
    super();
    this.state = { editor: null };
  }

  /**
   * Initialize tinymce on compnent mount
   * @method ComponentDidMount
   * @return {void}
   * @memberOf TinyMceComponent
   */
  componentDidMount() {
    tinymce.init({
      selector: `#${this.props.id}`,
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
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      setup: (editor) => {
        this.setState({ editor });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.props.handleEditorChange(content);
        });
      }
    });
  }

  /**
   * Remove instance of tinymce on compnent unmount
   * @method ComponentWillUnmount
   * @return {void}
   * @memberOf TinyMceComponent
   */
  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  /**
   * Renders the component
   * @method render
   * @return {void}
   * @memberOf TinyMceComponent
   */
  render() {
    return (
      <textarea
        id={this.props.id}
        value={this.props.content}
      />
    );
  }
}

TinyMceComponent.propTypes = {
  id: PropTypes.string.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default TinyMceComponent;
