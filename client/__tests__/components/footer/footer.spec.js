import React from 'react';
import { shallow } from 'enzyme';
import Footer from './../../../components/footer/Footer';

describe('Footer component', () => {
  const wrapper = shallow(
    <Footer />
  );

  it('renders', () => {
    expect(wrapper.find('.footer'))
    .toHaveLength(1);
  });
});
