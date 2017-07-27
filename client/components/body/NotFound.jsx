import React from 'react';
import ErrorComponent from './ErrorComponent';

const NotFound = () => (
  <div id="notfound">
    <ErrorComponent
      errorMsg={'Page not Found'}
      errorType={404}
    />
  </div>
);

export default NotFound;
