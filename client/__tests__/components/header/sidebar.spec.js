import React from 'react';
import { shallow } from 'enzyme';
import SideBar from './../../../components/header/SideBar';

describe('Sidebar component', () => {
  const logUserOut = jest.fn(() => Promise.resolve());
  const props = {
    user: {
      fullname: 'Daniel',
      email: 'greatbolutife@gmail.com'
    }
  };
  const wrapper = shallow(
    <SideBar
      logUserOut={logUserOut}
      {...props}
    />
  );

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.find('.side-nav'))
      .toHaveLength(1);
    });
  });
});
