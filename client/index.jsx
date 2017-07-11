import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './assets/sass/dokuments.scss';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import processLogin from './utils/processLogin';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() :
    f => f
  )
);

if (localStorage.getItem('jwtToken')) {
  const dispatch = store.dispatch;
  const token = localStorage.getItem('jwtToken');
  processLogin(token, dispatch);
  setAuthorizationToken(token);
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'));
