import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { SignupForm } from '../../../../components/body/login/SignupForm';

describe('Signup Form Component', () => {
  const props = {
    history: {
      push: () => null
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
        <SignupForm
          signUpAction={stub}
          {...props}
        />
      );
      expect(wrapper.find('#signupForm'))
      .toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('onChange', () => {
      it('sets form value to state', () => {
        const onChangeSpy = sinon.spy(SignupForm.prototype, 'onChange');
        const wrapper = mount(
          <SignupForm
            signUpAction={stub}
            {...props}
          />
        );
        wrapper.find('#fullname')
        .simulate('change', { target: { name: 'fullname', value: 'daniel' } });
        expect(onChangeSpy.called).toBeTruthy();
      });
    });

    describe('submitForm', () => {
      it('makes request to the login action', () => {
        const registerSpy = sinon.spy(SignupForm.prototype, 'submitForm');
        const wrapper = mount(
          <SignupForm
            signUpAction={stub}
            {...props}
          />
        );
        wrapper.find('#registerbutton')
        .simulate('click');
        expect(registerSpy.called).toBeTruthy();
      });
    });
  });
});
