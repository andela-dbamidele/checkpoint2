import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SingleDoc = (props) => {
  const { id, title, date, access } = props;
  const displayIcon = access === 0 ? (
    <i
      className="material-icons"
    >supervisor_account</i>
  ) : (
    <i className="material-icons">lock</i>
  );
  return (
    <div className="col s12 m4 l3 xl3">
      <Link to={`/documents/read/${id}/`}>
        <div className="card">
          <div className="card-image">
            <img src="/imgs/docs.png" alt="" />
          </div>
          <div className="card-action">
            <p>{title}</p>
            <p>
              { displayIcon }
              <span>&nbsp;Created on {date}&nbsp;</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

SingleDoc.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  access: PropTypes.number.isRequired,
};

SingleDoc.defaultProps = {
  date: '',
};

export default SingleDoc;
