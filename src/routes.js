import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import CityIndex from './RouteHandlers/CityIndex'
import NotFoundCity from './RouteHandlers/NotFoundCity'
import CityHandlers from './RouteHandlers/City'
// import SearchBlock from './containers/SearchBlock'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={CityIndex} />
            <Route path="not_found_city" component={NotFoundCity} />
            <Route path=":id" component={CityHandlers} />
        </Route>
    </Router>
)