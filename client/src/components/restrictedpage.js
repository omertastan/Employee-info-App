import { Route } from 'react-router-dom';
import * as React from 'react';
import { PrivateRoute } from './privateRoute';

export const RestrictedPage = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <PrivateRoute>
        <Component {...props} />
      </PrivateRoute>
    )}
  />
);
