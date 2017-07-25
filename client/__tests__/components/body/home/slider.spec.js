import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import Slider from '../../../../components/body/home/Slider';

describe('Slider Component', () => {
  const wrapper = mount(
    <Router >
      <Slider />
    </Router>
  );

  it('Renders', () => {
    expect(wrapper.find('.slider-cont'))
    .toHaveLength(1);
  });
});
