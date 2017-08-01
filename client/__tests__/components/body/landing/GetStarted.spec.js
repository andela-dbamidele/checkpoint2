import React from 'react';
import { shallow } from 'enzyme';
import GetStarted from '../../../../components/body/landing/GetStarted';

describe('Landing column 1', () => {
  const wrapper = shallow(
    <GetStarted />
  );
  it('renders', () => {
    expect(wrapper.find('#home3'))
    .toHaveLength(1);
  });
});
