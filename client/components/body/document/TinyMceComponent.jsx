import React, { Component } from 'react';

class TinyMceComponent extends Component {
  constructor() {
    super();
    this.state = { editor: null };
  }
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

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        value={this.props.content}
      />
    );
  }
}

export default TinyMceComponent;
