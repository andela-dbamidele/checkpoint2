import React from 'react';
import { mount } from 'enzyme';
// import sinon from 'sinon';
import { SignupForm } from '../../../../components/body/login/SignupForm';

describe('Signup Form Component', () => {
  const props = {
    history: {
      push: () => null
    }
  };

  const signUpAction = jest.fn(() => Promise.resolve());

  const wrapper = mount(
    <SignupForm
      signUpAction={signUpAction}
      {...props}
    />
  );

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.find('#signupForm'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('onChange', () => {
      it('sets form value to state', () => {
        const spy = jest.spyOn(wrapper.instance(), 'onChange');
        // const spy = sinon.spy(LoginForm.prototype, 'onChange');
        wrapper.find('#fullname')
        .simulate('change', { target: { name: 'fullname', value: 'daniel' } });
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });

    describe('submitForm', () => {
      it('makes request to the login action', () => {
        const spy = jest.spyOn(wrapper.instance(), 'submitForm');
        // const spy = sinon.spy(LoginForm.prototype, 'onChange');
        wrapper.find('#registerbutton')
        .simulate('click');
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
      });
    });
  });
});
