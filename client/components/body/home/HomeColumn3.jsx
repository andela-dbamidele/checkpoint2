import React from 'react';
import { Link } from 'react-router-dom';

const HomeColumn3 = () => (
  <div className="column">
    <div className="row">
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
      <div className="col s12 m6 l6 xl6 m-auto">
        <div className="content-wrapper">
          <div className="content">
            <h2>Dont Just Create, Share.</h2>
            <p>With our awesome one click sharing. we ensure&nbsp;
            your documents gets to the people you love easy and safe.&nbsp;
            </p>
            <Link to="/documents" className="btn btn-large">GET STARTED</Link>
          </div>
        </div>
      </div>
      <div className="clear" />
    </div>
  </div>
);

export default HomeColumn3;
