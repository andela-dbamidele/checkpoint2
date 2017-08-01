import React from 'react';
import Parallax from './landing/Parallax';
import Editing from './landing/Editing';
import Security from './landing/Security';
import GetStarted from './landing/GetStarted';

const Landing = () => (
  <div>
    <Parallax />
    <Editing />
    <Security />
    <GetStarted />
  </div>
);

export default Landing;
