import React from 'react';
import { shallow } from 'enzyme';
import ErrorComponent from '../../../components/body/ErrorComponent';

describe('>>> Error Component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<ErrorComponent errorMsg={'Sorry'} errorType={404} />);
  });
  describe('>>>Rendering', () => {
    it('should render', () => {
      expect(wrapper.find('.home-div').exists()).toBeTruthy();
    });
    it('contain a div with #notFound', () => {
      expect(wrapper.find('#notFound').exists()).toBeTruthy();
    });
  });

  describe('>>>Props', () => {
    it('should display errorMsg based on props', () => {
      expect(wrapper.find('h3').text()).toEqual('Sorry');
    });
    it('should display error img based on props', () => {
      expect(wrapper.find('img').props().src).toEqual('/imgs/404.png');
    });
  });
});
