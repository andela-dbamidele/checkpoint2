import React from 'react';
import { mount } from 'enzyme';
// import sinon from 'sinon';
import { LoginForm } from '../../../../components/body/login/LoginForm';

describe('Login Form Component', () => {
  const props = {
    history: {
      push: () => null,
    },
    location: {
      search: ''
    }
  };
  const loginAction = jest.fn()
    .mockImplementationOnce(() => Promise.resolve());

  const wrapper = mount(
    <LoginForm
      loginAction={loginAction}
      {...props}
    />
  );

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.find('#loginForm'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('onChange', () => {
      it('sets form value to state', () => {
        const spy = jest.spyOn(wrapper.instance(), 'onChange');
        // const spy = sinon.spy(LoginForm.prototype, 'onChange');
        wrapper.find('#identifier')
        .simulate('change', { preventDefault: () => null });
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('submitForm', () => {
      it('makes request to the login action', () => {
        const spy = jest.spyOn(wrapper.instance(), 'submitForm');
        // const spy = sinon.spy(LoginForm.prototype, 'onChange');
        wrapper.find('#loginbutton')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });
  });
});
