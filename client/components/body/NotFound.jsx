import React from 'react';
import ErrorComponent from './ErrorComponent';

const NotFound = () => (
  <div id="notfound" className="center">
    <ErrorComponent
      errorMsg={'Page not Found'}
      errorType={404}
    />
  </div>
);

export default NotFound;
