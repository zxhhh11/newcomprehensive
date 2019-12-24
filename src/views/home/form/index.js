import React from 'react';
import { Route, Switch as RouteSwitch, Redirect, withRouter } from 'react-router-dom';
import AdvancedForm from './advancedForm';
import BasicForm from './basicForm';
import StepForm from './stepForm';

const Form = withRouter(() => {
  return (
    <RouteSwitch>
      <Route component={AdvancedForm} exact path={`${process.env.PUBLIC_URL}/form/advanced`}></Route>
      <Route component={BasicForm} exact path={`${process.env.PUBLIC_URL}/form/basic`}></Route>
      <Route component={StepForm} exact path={`${process.env.PUBLIC_URL}/form/step`}></Route>
      <Redirect exact path={`${process.env.PUBLIC_URL}/form`} to={`${process.env.PUBLIC_URL}/form/basic`}></Redirect>
      <Redirect from='*' to='/404' />
    </RouteSwitch>
  );
});

export default Form;
