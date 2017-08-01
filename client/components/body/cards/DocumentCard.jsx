import React from 'react';
import PropTypes from 'prop-types';
import timeago from 'timeago.js';
import { Link } from 'react-router-dom';

const DocumentCard = (props) => {
  const { id, title, date, access } = props;
  const accessIcons = [
    'public',
    'lock',
    'supervisor_account'
  ];
  $(() => {
    timeago().render(document.querySelectorAll('.timeSpan'));
  });
  return (
    <div id="DocumentCard" className="col s6 m4 l3 xl3">
      <Link to={`/documents/read/${id}/`}>
        <div className="card">
          <div className="card-action">
            <p className="truncate">{title}</p>
            <p>
              <i className="material-icons">{ accessIcons[access] }</i>
              <span>&nbsp;Created&nbsp;
                <span
                  className="timeSpan"
                  dateTime={date}
                />&nbsp;</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

DocumentCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  access: PropTypes.number.isRequired,
};

DocumentCard.defaultProps = {
  date: '',
};

export default DocumentCard;
