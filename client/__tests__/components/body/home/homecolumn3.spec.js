import React from 'react';
import { shallow } from 'enzyme';
import HomeColumn3 from '../../../../components/body/landing/GetStarted';

describe('Landing column 1', () => {
  const wrapper = shallow(
    <HomeColumn3 />
  );
  it('renders', () => {
    expect(wrapper.find('#home3'))
    .toHaveLength(1);
  });
});
