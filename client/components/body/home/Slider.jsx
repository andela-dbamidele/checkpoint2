import React from 'react';
import { Link } from 'react-router-dom';

const Slider = () => (
  <div className="slider-cont">
    <div className="parallax-container">
      <div className="content-wrapper">
        <div className="content-body">
          <h1>Dokuments&#174; Document Manager</h1>
          <p>With Dokuments, creating, editing and&nbsp;
          sharing of document becomes easy.</p>
          <Link to="/documents" className="btn btn-large">GET STARTED</Link>
        </div>
      </div>
      <div className="parallax">
        <img src="/imgs/doc-6.jpeg" alt="Background Image" />
      </div>
    </div>
  </div>
);

export default Slider;
