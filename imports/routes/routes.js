import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Dashboard from '../ui/Dashboard';
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = (Component) => {
  if(Meteor.userId()){
    return <Redirect to="/dashboard"/>
  }else {
    return <Component />
  }
};

const onEnterPrivatePage = (Component) => {
  if(!Meteor.userId()){
    return <Redirect to="/" />
  }else{
    return <Component />
  }
}

export const onAuthChange = (isAuthenticated) => {
    const pathName = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if(isUnauthenticatedPage && isAuthenticated){
    history.replace('/dashboard');
  }
  else if(isAuthenticatedPage && !isAuthenticated){
    history.replace('/');
  }
}

export const Routes = () => (
<Router history={history}>
  <Switch>
    <Route path="/" exact={true} render={() => onEnterPublicPage(Login)} />
    <Route path="/signup" render={() => onEnterPublicPage(Signup)}/>
    <Route path="/dashboard" render={() => onEnterPrivatePage(Dashboard)}/>
    <Route path="*" component={NotFound} />
  </Switch>
</Router>
);