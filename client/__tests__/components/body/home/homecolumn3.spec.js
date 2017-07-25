import React from 'react';
import { shallow } from 'enzyme';
import HomeColumn3 from '../../../../components/body/home/HomeColumn3';

describe('Homepage column 1', () => {
  const wrapper = shallow(
    <HomeColumn3 />
  );
  it('renders', () => {
    expect(wrapper.find('#home3'))
    .toHaveLength(1);
  });
});
