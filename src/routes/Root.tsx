import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../types'
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

class Component extends React.Component<Props, {}> {
    render() {
        const selectedCarsMovements = this.props.carsMovements.filter(m => m.checked).map(m => m.movement)
        const selectedPailsRailsMovements = this.props.pailsRailsMovements.filter(m => m.checked).map(m => m.movement)
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={App} />
                    <Route path="/cars" exact={true} component={Cars} />
                    <Route path="/cars/settings" exact={true} component={CarsSettings} />
                    <Route path="/cars/runner" exact={true} render={props =>
                        <Runner {...props} movements={selectedCarsMovements} render={(currentMovement, onNextMovement) =>
                            <CarsRunnerContainer
                                movement={currentMovement}
                                onNextMovement={onNextMovement}
                            />}
                        />}
                    />
                    <Route path="/pailsrails" exact={true} component={PailsRails} />
                    <Route path="/pailsrails/settings" exact={true} component={Settings} />
                    <Route path="/pailsrails/runner" exact={true} render={props =>
                        <Runner {...props} movements={selectedPailsRailsMovements} render={(currentMovement, onNextMovement) =>
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

const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        carsMovements: state.cars.movements,
        pailsRailsMovements: state.pailsRails.movements
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Component)
