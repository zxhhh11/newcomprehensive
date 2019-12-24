import React from 'react';
import { Route, Switch as RouteSwitch, Redirect, withRouter } from 'react-router-dom';
import SearchList from './searchList/index.js';
import BasicList from './basicList';
import CardList from './cardList';
// import SearchTable from './searchTable';
import SearchTable from './searchTable';

const List = withRouter(() => {
  return (
    <RouteSwitch>
      <Route component={BasicList} exact path={`${process.env.PUBLIC_URL}/list/basicList`}></Route>
      <Route component={CardList} exact path={`${process.env.PUBLIC_URL}/list/cardList`}></Route>
      <Route component={SearchTable} exact path={`${process.env.PUBLIC_URL}/list/searchTable`}></Route>
      <Route component={SearchList} path={`${process.env.PUBLIC_URL}/list/searchList`}></Route>
      <Redirect
        exact
        path={`${process.env.PUBLIC_URL}/list`}
        to={`${process.env.PUBLIC_URL}/list/basicList`}
      ></Redirect>
      <Redirect from='*' to='/404' />
    </RouteSwitch>
  );
});

export default List;
