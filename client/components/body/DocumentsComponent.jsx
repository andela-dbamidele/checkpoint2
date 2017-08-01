import React from 'react';
import { DocumentHeader } from './document/DocHeader';
import { DocBody } from './document/DocListing';

const DocumentsComponent = () => (
  <div className="documents-wrapper">
    <div className="doc-body">
      <DocumentHeader />
      <DocBody />
    </div>
    <div className="clear" />
  </div>
);

export default DocumentsComponent;
