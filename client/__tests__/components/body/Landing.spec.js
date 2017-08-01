import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../../components/body/Landing';
import Parallax from '../../../components/body/landing/Parallax';
import Editing from '../../../components/body/landing/Editing';
import Security from '../../../components/body/landing/Security';
import GetStarted from '../../../components/body/landing/GetStarted';

describe('Home page', () => {
  const wrapper = shallow(<Landing />);
  it('renders', () => {
    expect(wrapper.find(Parallax)).toHaveLength(1);
    expect(wrapper.find(Editing)).toHaveLength(1);
    expect(wrapper.find(Security)).toHaveLength(1);
    expect(wrapper.find(GetStarted)).toHaveLength(1);
  });
});
