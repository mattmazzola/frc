import * as React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import App from './App'
import Settings from './Settings'
import Runner from './Runner'
import NoMatch from './NoMatch'
import './Root.css'

class Root extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={App} />
                    <Route path="/settings" exact={true} component={Settings} />
                    <Route path="/runner" exact={true} component={Runner} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default Root;
