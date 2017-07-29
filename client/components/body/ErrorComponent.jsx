import React from 'react';
import PropTypes from 'prop-types';

/**
 * displays an error page when user navigates to an alien page
 * @function NotFound
 * @return {void} - React component
 */
const ErrorComponent = ({ errorMsg, errorType }) => (
  <div className="home-div">
    <div className="col s12 home-inner" id="notFound">
      <div
        className="inner-content center m-auto"
      >
        <span className="center">
          <img
            id="errorImg"
            alt="loading"
            className="responsive-img"
            src={`/imgs/${errorType}.png`}
          />
        </span>
        <h3 className="center">{ errorMsg }</h3>
      </div>
    </div>
  </div>
);

ErrorComponent.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  errorType: PropTypes.number.isRequired
};

export default ErrorComponent;
