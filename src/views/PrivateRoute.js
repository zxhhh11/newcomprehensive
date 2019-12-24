/* eslint-disable */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getSessionStorage} from '../utils/storage'
export const PrivateRoute = ({ component: Component, ...rest }) => (
 
  <Route {...rest} render={props => (
    getSessionStorage('auth_user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/login`, state: { from: props.location } }} />
  )} />
);
