import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginPage from '../../../components/body/LoginPage';
import storeMock from '../../../__mocks__/storeMock.json';
import authStoreMock from '../../../__mocks__/authStoreMock.json';

describe('Login Component', () => {
  let wrapper;
  const initialState = storeMock;
  const mockStore = configureStore();
  let store;
  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <MemoryRouter>
        <LoginPage store={store} />
      </MemoryRouter>
    );
  });

  describe('Rendering', () => {
    it('renders', () => {
      expect(wrapper.length)
      .toEqual(1);
    });
  });

  describe('Authentication', () => {
    it('should push to a new route if user is authenticated', () => {
      const newState = authStoreMock;
      const newStore = mockStore(newState);
      const authWrapper = mount(
        <MemoryRouter>
          <LoginPage store={newStore} />
        </MemoryRouter>
      );
      expect(authWrapper.instance().history
      .location.pathname).toEqual('/documents');
    });
  });
});
