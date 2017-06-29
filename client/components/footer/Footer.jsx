import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="row">
        <div className="col s12 m6 l6 xl6">
          <p> &copy;{date} Dokuments &trade;. All Rights Reserved</p>
        </div>

        <div className="col s12 m6 l6 xl6" />
      </div>
    </div>
  );
};

export default Footer;
