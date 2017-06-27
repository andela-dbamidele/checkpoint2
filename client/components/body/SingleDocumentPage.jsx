import React from 'react';

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
  }

  /**
   * Renders component to the view
   * @method render
   * @returns {void}
   * @memberOf SingleDocumentPage
   */
  render() {
    return (
      <div className="row single-document-wrapper">
        <div className="content-wrap">
          <div className="title">
            <h3>This is my title </h3>
          </div>
          <div className="content">
            <p>And my content goes here</p>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default SingleDocumentPage;
