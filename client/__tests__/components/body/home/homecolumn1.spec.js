import React from 'react';
import { shallow } from 'enzyme';
import HomeColumn1 from '../../../../components/body/home/HomeColumn1';

describe('Homepage column 1', () => {
  const wrapper = shallow(
    <HomeColumn1 />
  );
  it('renders', () => {
    expect(wrapper.find('#home1'))
    .toHaveLength(1);
  });
});
