import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../../components/body/Landing';
import Parallax from '../../../components/body/landing/Parallax';
import HomeColumn1 from '../../../components/body/landing/Editing';
import HomeColumn2 from '../../../components/body/landing/Security';
import HomeColumn3 from '../../../components/body/landing/GetStarted';

describe('Home page', () => {
  const wrapper = shallow(<Landing />);
  it('renders', () => {
    expect(wrapper.find(Parallax)).toHaveLength(1);
    expect(wrapper.find(HomeColumn1)).toHaveLength(1);
    expect(wrapper.find(HomeColumn2)).toHaveLength(1);
    expect(wrapper.find(HomeColumn3)).toHaveLength(1);
  });
});
