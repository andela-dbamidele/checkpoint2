import React from 'react';
import { shallow } from 'enzyme';
import mockProps from '../../../__mocks__/mockProps.json';
import { Header } from './../../../components/header/Index';

describe('Header Component', () => {
  const logoutAction = jest.fn(() => Promise.resolve());
  const deleteDocuments = jest.fn(() => Promise.resolve());
  const history = {
    push: () => null
  };
  const wrapper = shallow(
    <Header
      deleteDocuments={deleteDocuments}
      logoutAction={logoutAction}
      {...mockProps}
      history={history}
    />
  );

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.find('.header-div'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('ComponentDidMount', () => {
      it('get called', () => {
        const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');
        wrapper.instance().componentDidMount();
        expect(spy)
        .toHaveBeenCalled();
      });
    });

    describe('ComponentWillReceiveProps', () => {
      it('sets new props to state', () => {
        const nextProps = {
          auth: {
            isAuthenticated: true,
            user: {}
          }
        };
        wrapper.instance().componentWillReceiveProps(nextProps);
        expect(wrapper.instance().state.isAuthenticated)
        .toBeTruthy();
      });
    });

    describe('logUserOut', () => {
      it('logs user out when called', () => {
        const spy = jest.spyOn(wrapper.instance(), 'logUserOut');
        wrapper.setState({
          isAuthenticated: true,
        });
        wrapper.find('#logout')
        .simulate('click', { preventDefault: () => null });
        expect(spy)
        .toHaveBeenCalled();
        wrapper.find('#logoutmobile')
        .simulate('click', { preventDefault: () => null });
        expect(spy)
        .toHaveBeenCalledTimes(2);
      });
    });
  });
});
