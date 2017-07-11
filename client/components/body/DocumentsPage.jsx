import React from 'react';
import DocHeader from './document/DocHeader';
import DocListing from './document/DocListing';

const DocumentPage = () => (
  <div className="documents-wrapper">
    <div className="doc-body">
      <DocHeader />
      <DocListing />
    </div>
    <div className="clear" />
  </div>
);

export default DocumentPage;
