import React from 'react';
import { mount } from 'enzyme';
import { Users } from
  '../../../components/body/Users';
import mockProps from '../../../__mocks__/mockProps.json';
import authMockProps from '../../../__mocks__/authMockProps.json';
import historyMock from '../../../__mocks__/historyMock';

describe('Admin Page', () => {
  const editUserRole = jest.fn(() => Promise.resolve(false));
  const getUsers = jest.fn(() => Promise.resolve(true));
  const deleteUser = jest.fn(() => Promise.resolve(false));
  const props = authMockProps;
  const wrapper = mount(
    <Users
      history={historyMock}
      {...props}
      editUserRole={editUserRole}
      getUsers={getUsers}
      deleteUser={deleteUser}
    />
  );
  wrapper.setState({
    errors: {
      users: {
        message: 'error'
      }
    },
  });

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.find('.documents-wrapper')).toHaveLength(1);
    });
  });

  describe('Class Methods', () => {
    describe('ComponentDidMount', () => {
      it('redirects uauthourized users', () => {
        const shallowWrapper = mount(
          <Users
            history={historyMock}
            {...mockProps}
            editUserRole={editUserRole}
            getUsers={getUsers}
            deleteUser={deleteUser}
          />
        );
        expect(shallowWrapper.instance().props.history.push())
        .toEqual(null);
      });
    });

    describe('ComponentWillReceiveProps', () => {
      it('sets state to new props', () => {
        const nextProps = {
          users: {
            users: [],
            totalCount: 10
          },
          errors: {
            users: {
              message: 'users'
            }
          }
        };
        wrapper.instance().componentWillReceiveProps(nextProps);
        expect(wrapper.instance().state.users)
        .toEqual([]);
      });
    });

    describe('onChange Method', () => {
      it('sets the new value of role to state', () => {
        const spy = jest.spyOn(wrapper.instance(), 'onChange');
        wrapper.setState({
          users: [
            {
              id: 7,
              fullname: 'imanued',
              username: 'ncsifncedn',
              email: 'hsdjd@erev.com',
              roleId: 1
            }
          ]
        });
        wrapper.find('#editedRole')
        .simulate('change', { target: { value: 2 } });
        expect(spy)
        .toHaveBeenCalled();
      });
    });

    describe('deleteUser Method', () => {
      it('deletes a user when called', () => {
        const spy = jest.spyOn(wrapper.instance(), 'deleteUserCard');
        wrapper.setState({
          users: [
            {
              id: 7,
              fullname: 'imanued',
              username: 'ncsifncedn',
              email: 'hsdjd@erev.com',
              roleId: 1
            }
          ]
        });
        wrapper.find('#deleteUser')
        .simulate('click');
        expect(spy)
        .toHaveBeenCalled();
      });

      it('returns error message if user is not authorized', () => {
        const deleteUserFalse = jest.fn(() => Promise.resolve(true));
        const altWrapper = mount(
          <Users
            history={historyMock}
            {...props}
            editUserRole={editUserRole}
            getUsers={getUsers}
            deleteUser={deleteUserFalse}
          />
        );
        const spy = jest.spyOn(altWrapper.instance(), 'deleteUserCard');
        altWrapper.setState({
          users: [
            {
              id: 7,
              fullname: 'imanued',
              username: 'ncsifncedn',
              email: 'hsdjd@erev.com',
              roleId: 1
            }
          ]
        });
        altWrapper.find('#deleteUser')
        .simulate('click');
        expect(spy)
        .toHaveBeenCalled();
      });
    });

    describe('editUser Method', () => {
      it('edits a user when called', () => {
        const spy = jest.spyOn(wrapper.instance(), 'editUser');
        wrapper.setState({
          users: [
            {
              id: 7,
              fullname: 'imanued',
              username: 'ncsifncedn',
              email: 'hsdjd@erev.com',
              roleId: 1
            }
          ]
        });
        wrapper.find('#editUser')
        .simulate('click');
        expect(spy)
        .toHaveBeenCalled();
      });

      it('returns error message if an error occured', () => {
        const editUserRoleFalse = jest.fn(() => Promise.resolve(true));
        const altWrapper = mount(
          <Users
            history={historyMock}
            {...props}
            editUserRole={editUserRoleFalse}
            getUsers={getUsers}
            deleteUser={deleteUser}
          />
        );
        const spy = jest.spyOn(altWrapper.instance(), 'editUser');
        altWrapper.setState({
          users: [
            {
              id: 7,
              fullname: 'imanued',
              username: 'ncsifncedn',
              email: 'hsdjd@erev.com',
              roleId: 1
            }
          ]
        });
        altWrapper.find('#editUser')
        .simulate('click');
        expect(spy)
        .toHaveBeenCalled();
      });
    });
  });
});
