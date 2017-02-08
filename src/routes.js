import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import CityIndex from './RouteHandlers/CityIndex'
import NotFound from './RouteHandlers/NotFound'
import CityHandlers from './RouteHandlers/City'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={CityIndex} />
            <Route path=":id" component={CityHandlers} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
)