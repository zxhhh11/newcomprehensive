import React from 'react';
import { Route, Switch as RouteSwitch, Redirect } from 'react-router-dom';
import BasicUpload from './basicUpload';
import AdvancedUpload from './advancedUpload';

const Upload = () => {
  return (
    <RouteSwitch>
      <Route component={AdvancedUpload} exact path={`${process.env.PUBLIC_URL}/upload/advancedUpload`}></Route>
      <Route component={BasicUpload} exact path={`${process.env.PUBLIC_URL}/upload/basicUpload`}></Route>
      <Redirect
        exact
        path={`${process.env.PUBLIC_URL}/upload`}
        to={`${process.env.PUBLIC_URL}/upload/basicUpload`}
      ></Redirect>
      <Redirect from='*' to='/404' />
    </RouteSwitch>
  );
};

export default Upload;
