import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ReduxState } from '../types'
import { carsResetSettings, carsUpdateSettings } from '../actions'
import './Settings.css'

class Settings extends React.Component<Props, {}> {
    onChangeClockwise = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10)
        const nextSettings = { ...this.props.settings, clockwiseRotations: value }
        this.props.updateSettings(nextSettings)
    }

    onChangeCounterClockwise = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10)
        const nextSettings = { ...this.props.settings, counterClockwiseRotations: value }
        this.props.updateSettings(nextSettings)
    }

    onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10)
        const nextSettings = { ...this.props.settings, duration: value }
        this.props.updateSettings(nextSettings)
    }
    
    render() {
        return <div className="frc-page">
            <NavLink className="frc-page_header" to="/cars">
                <i className="material-icons">arrow_back</i> 
                <div>CARs</div>
            </NavLink>
            <main className="frc-page_main">
                <section className="settings">
                    <div>
                        <input id="passive" type="number" min="1" max="10" value={this.props.settings.clockwiseRotations} onChange={this.onChangeClockwise} />
                    </div>
                    <label htmlFor="passive">Clockwise Rotations</label>
                    <div>
                        <input id="pails" type="number" min="1" max="10" value={this.props.settings.counterClockwiseRotations} onChange={this.onChangeCounterClockwise} />
                    </div>
                    <label htmlFor="pails">Counter-Clockwise Rotations</label>
                    <div>
                        <input id="rails" type="number" min="5" max="60" value={this.props.settings.duration} onChange={this.onChangeDuration} />
                    </div>
                    <label htmlFor="rails">Duration</label>
                </section>
            </main>
        </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
        resetSettings: carsResetSettings,
        updateSettings: carsUpdateSettings
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        settings: state.carsSettings
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(Settings)