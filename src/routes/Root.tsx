import * as React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import App from './App'
import Cars from './Cars'
import CarsSettings from './CarsSettings'
import CarsRunnerContainer from '../components/CarsRunnerContainer'
import PailsRails from './PailsRails'
import MovementTimerContainer from '../components/MovementTimerContainer'
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
                    <Route path="/cars" exact={true} component={Cars} />
                    <Route path="/cars/settings" exact={true} component={CarsSettings} />
                    <Route path="/cars/runner" exact={true} render={props =>
                        <Runner {...props} render={(currentMovement, onNextMovement) =>
                            <CarsRunnerContainer
                                movement={currentMovement}
                                onNextMovement={onNextMovement}
                            />}
                        />}
                    />
                    <Route path="/pailsrails" exact={true} component={PailsRails} />
                    <Route path="/pailsrails/settings" exact={true} component={Settings} />
                    <Route path="/pailsrails/runner" exact={true} render={props =>
                        <Runner {...props} render={(currentMovement, onNextMovement) =>
                            <MovementTimerContainer
                                movement={currentMovement}
                                onNextMovement={onNextMovement}
                            />}
                        />}
                    />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}

export default Root;
