import React from 'react';
import { Route, Switch as RouteSwitch, Redirect } from 'react-router-dom';
import ApplicationList from './applicationList';
import ArticleList from './articleList';
import ProjectList from './projectList';

const SearchList = () => {
  return (
    <RouteSwitch>
      <Route component={ApplicationList} exact path={`${process.env.PUBLIC_URL}/list/searchList/application`}></Route>
      <Route component={ArticleList} exact path={`${process.env.PUBLIC_URL}/list/searchList/article`}></Route>
      <Route component={ProjectList} exact path={`${process.env.PUBLIC_URL}/list/searchList/project`}></Route>
      <Redirect
        exact
        path={`${process.env.PUBLIC_URL}/list/searchList/`}
        to={`${process.env.PUBLIC_URL}/list/searchList/article`}
      ></Redirect>
      <Redirect from='*' to='/404' />
    </RouteSwitch>
  );
};

export default SearchList;
