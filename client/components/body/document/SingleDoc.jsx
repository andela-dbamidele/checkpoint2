import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SingleDoc = (props) => {
  const { id, title, date, access } = props;
  const accessIcons = [
    'public',
    'lock',
    'supervisor_account'
  ];
  return (
    <div className="col s6 m4 l3 xl3">
      <Link to={`/documents/read/${id}/`}>
        <div className="card">
          <div className="card-action">
            <p className="truncate">{title}</p>
            <p>
              <i className="material-icons">{ accessIcons[access] }</i>
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
