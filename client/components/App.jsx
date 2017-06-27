import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DocumentsPage from './body/DocumentsPage';
import Footer from './footer/Footer';
import Header from './header/Index';
import Homepage from './body/Homepage';
import LoginPage from './body/LoginPage';
import NotFound from './body/NotFound';
import SingleDocumentPage from './body/SingleDocumentPage';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div className="main-div">
      <Header />
      <div className="body-cont">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/documents" component={DocumentsPage} />
          <Route
            exact path="/documents/read/:id"
            component={SingleDocumentPage}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route component={NotFound} />
        </Switch>
        <div className="clear" />
      </div>
      <Footer />
      <div className="clear" />
    </div>
  </Router>
);

export default App;

