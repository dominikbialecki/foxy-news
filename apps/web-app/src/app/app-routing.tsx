import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {PendingLinks} from './features/links/components/pendnig-links';
import {PageNotFound} from './features/page-not-found/page-not-found';

export const AppRouting = () => <Switch>
    <Redirect exact from="/" to="/links"/>
    <Route exact path="/links" component={PendingLinks}/>
    <Route component={PageNotFound}/>
</Switch>;
