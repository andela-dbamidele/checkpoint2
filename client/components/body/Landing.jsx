import React from 'react';
import Parallax from './landing/Parallax';
import HomeColumn1 from './landing/Editing';
import HomeColumn2 from './landing/Security';
import HomeColumn3 from './landing/GetStarted';

const Landing = () => (
  <div>
    <Parallax />
    <HomeColumn1 />
    <HomeColumn2 />
    <HomeColumn3 />
  </div>
);

export default Landing;
