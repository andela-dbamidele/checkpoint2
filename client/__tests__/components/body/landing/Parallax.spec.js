import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import Parallax from '../../../../components/body/landing/Parallax';

describe('Parallax Component', () => {
  const wrapper = mount(
    <Router >
      <Parallax />
    </Router>
  );

  it('Renders', () => {
    expect(wrapper.find('.slider-cont'))
    .toHaveLength(1);
  });
});
