import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DocumentsComponent from './body/DocumentsComponent';
import Footer from './footer/Footer';
import Header from './header/Index';
import Landing from './body/Landing';
import Login from './body/Login';
import NotFound from './body/NotFound';
import { SingleDocument } from './body/SingleDocumentComponent';
import Users from './body/Users';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div className="main-div">
      <Header />
      <div className="body-cont">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/documents" component={DocumentsComponent} />
          <Route
            exact path="/documents/read/:id"
            component={SingleDocument}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
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

