import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ReduxState } from '../types'
import { pailsRailsToggleMovement } from '../actions'
import Movement from '../components/Movement'

class Component extends React.Component<Props, {}> {
    render() {
        return <div className="frc-nav-page">
            <NavLink className="frc-nav-page_header" to="/"><i className="material-icons">arrow_back</i> Main</NavLink>
            <h1 className="frc-nav-page_title">PAILs/RAILs</h1>
            <main className="frc-nav-list">
                <div className="movements">
                    {this.props.movements.map((m, i) =>
                        <Movement key={i} onClick={() => this.props.toggleMovement(m)} movement={m} />
                    )}
                </div>
            </main>
            <footer className="frc_footer">
                <NavLink className="link link-default" to="/pailsrails/settings" exact={true}><i className="material-icons">settings</i> Settings</NavLink>
                <NavLink className="link link-primary" to="/pailsrails/runner" exact={true}><i className="material-icons">play_circle_outline</i> Start</NavLink>
            </footer>
        </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
        toggleMovement: pailsRailsToggleMovement
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        movements: state.pailsRails.movements
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(Component)