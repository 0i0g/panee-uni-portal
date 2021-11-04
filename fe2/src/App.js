import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { Role } from './helpers/constants';
import ManageClassPage from './pages/lecturer/ManageClassPage';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <div>
      <div>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/checkin" component={HomePage} />
            <PrivateRoute
              path="/manageclass"
              exact
              roles={Role.lecturer}
              component={ManageClassPage}
            />
            <PrivateRoute
              path="/manageclass/:className"
              roles={Role.lecturer}
              component={ManageClassPage}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
        <div className="mt-10"></div>
      </div>
    </div>
  );
};

export default App;
