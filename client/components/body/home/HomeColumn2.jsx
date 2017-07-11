import React from 'react';

const HomeColumn2 = () => (
  <div className="column">
    <div className="row">
      <div className="col s12 m6 l6 xl6 m-auto">
        <div className="content-wrapper">
          <div className="content">
            <h2>Designed with security in mind</h2>
            <p>We value the security of your documents.&nbsp;
            You can choose to set document access to public,<br />
            private, or role based.
            </p>
          </div>
        </div>
      </div>
      <div className="col s12 m6 l6 xl6 m-auto">
        <div className="content-wrapper">
          <div className="content">
            <img
              className="responsive-img"
              src="/imgs/doc_security.png"
              alt="Secured"
            />
            <div className="clear" />
          </div>
        </div>
      </div>
      <div className="clear" />
    </div>
  </div>
);

export default HomeColumn2;
