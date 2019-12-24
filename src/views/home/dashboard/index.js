import React from 'react';
import { Route, Switch as RouteSwitch, Redirect, withRouter } from 'react-router-dom';
import Analysis from './analysis';
import Monitor from './monitor';
import Workplace from './workplace';
import ProjectDetail from './projectDetail';

const Dashboard = withRouter(() => {
  return (
    <RouteSwitch>
      <Route component={Analysis} exact path={`${process.env.PUBLIC_URL}/dashboard/analysis`}></Route>
      <Route component={Monitor} exact path={`${process.env.PUBLIC_URL}/dashboard/monitor`}></Route>
      <Route component={Workplace} exact path={`${process.env.PUBLIC_URL}/dashboard/workplace`}></Route>
      <Route component={ProjectDetail} exact path={`${process.env.PUBLIC_URL}/dashboard/projectDetail`}></Route>
      <Redirect
        exact
        path={`${process.env.PUBLIC_URL}/dashboard`}
        to={`${process.env.PUBLIC_URL}/dashboard/analysis`}
      ></Redirect>
      <Redirect from='*' to='/404' />
    </RouteSwitch>
  );
});

export default Dashboard;
