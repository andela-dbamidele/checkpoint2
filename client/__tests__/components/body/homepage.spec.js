import React from 'react';
import { shallow } from 'enzyme';
import Homepage from '../../../components/body/Homepage';
import Slider from '../../../components/body/home/Slider';
import HomeColumn1 from '../../../components/body/home/HomeColumn1';
import HomeColumn2 from '../../../components/body/home/HomeColumn2';
import HomeColumn3 from '../../../components/body/home/HomeColumn3';

describe('>>> Home page', () => {
  const wrapper = shallow(<Homepage />);
  it('renders', () => {
    expect(wrapper.find(Slider)).toHaveLength(1);
    expect(wrapper.find(HomeColumn1)).toHaveLength(1);
    expect(wrapper.find(HomeColumn2)).toHaveLength(1);
    expect(wrapper.find(HomeColumn3)).toHaveLength(1);
  });
});
