import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import NotFound from './RouteHandlers/NotFound'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path=":id" component={App} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
)