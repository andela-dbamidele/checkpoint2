import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
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

  let stub;

  beforeEach(() => {
    stub = sinon.stub();
  });

  afterEach(() => {
    stub.reset();
  });

  describe('Rendering', () => {
    it('renders', () => {
      const wrapper = mount(
        <LoginForm
          loginAction={stub}
          {...props}
        />
      );
      expect(wrapper.find('#loginForm'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('onChange', () => {
      it('sets form value to state', () => {
        const onChangeSpy = sinon.spy(LoginForm.prototype, 'onChange');
        const wrapper = mount(
          <LoginForm
            loginAction={stub}
            {...props}
          />
        );
        wrapper.find('#identifier')
        .simulate('change', { preventDefault: () => null });
        expect(onChangeSpy.called).toBeTruthy();
      });
    });

    describe('submitForm', () => {
      it('makes request to the login action', () => {
        const submitSpy = sinon.spy(LoginForm.prototype, 'submitForm');
        const loginAction = jest.fn()
          .mockImplementationOnce(() => Promise.resolve({}));
        const wrapper = mount(
          <LoginForm
            loginAction={loginAction}
            {...props}
          />
        );
        wrapper.find('#loginbutton')
        .simulate('click');
        expect(submitSpy.called).toBeTruthy();
      });
    });
  });
});
