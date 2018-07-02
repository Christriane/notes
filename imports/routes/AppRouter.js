import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import Dashboard from '../ui/Dashboard';
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

export const history = createHistory();


export const AppRouter = () => (
<Router history={history}>
  <Switch>
    <PublicRoute path="/" exact={true} component={Login} />
    <PublicRoute path="/signup" component={Signup} />
    <PrivateRoute path="/dashboard" exact={true} component={Dashboard} />
    <PrivateRoute path="/dashboard/:id" component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Switch>
</Router>
);