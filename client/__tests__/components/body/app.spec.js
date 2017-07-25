import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../../../components/App';
import Homepage from '../../../components/body/Homepage';
import Header from '../../../components/header/Index';
import Footer from '../../../components/footer/Footer';

describe('App component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  it('renders', () => {
    expect(wrapper.find('.main-div').exists()).toBeTruthy();
    expect(wrapper.find(Homepage).exists).toBeTruthy();
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(6);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
