import * as React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import App from './App'
import Page from './Page'

class Root extends React.Component {
    render(): any {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={App} />
                    <Route path="/" exact={false} render={Page} />
                </Switch>
            </Router>
        )
    }
}

export default Root;
