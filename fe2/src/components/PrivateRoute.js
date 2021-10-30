import React from 'react';
import { Redirect, Route } from 'react-router';
import ForbiddenPage from '../pages/ForbiddenPage';
import authService from '../services/auth.service';
import Layout from './Layout';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isAuthenticated() ? (
          authService.isRole(roles) ? (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          ) : (
            <ForbiddenPage />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
