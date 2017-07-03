import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Create Slider component
 * @class Slider
 * @extends {React.Component}
 */
class Slider extends React.Component {
  /**
   * Activates parallax and sidenav
   * @method componentDidMount
   * @return {void}
   * @memberOf Slider
   */
  componentDidMount() {
    $('.parallax').parallax();
    $('.button-collapse').sideNav();
  }

  /**
   * Renders Slider component
   * @method render
   * @returns {void}
   * @memberOf Slider
   */
  render() {
    return (
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
  }
}

export default Slider;
