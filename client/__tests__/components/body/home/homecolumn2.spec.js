import React from 'react';
import { shallow } from 'enzyme';
import HomeColumn2 from '../../../../components/body/home/HomeColumn2';

describe('Homepage column 1', () => {
  const wrapper = shallow(
    <HomeColumn2 />
  );
  it('renders', () => {
    expect(wrapper.find('#home2'))
    .toHaveLength(1);
  });
});
