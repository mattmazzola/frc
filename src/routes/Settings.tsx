import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ReduxState } from '../types'
import { resetSettings, updateSettings } from '../actions'
import './Settings.css'

class Settings extends React.Component<Props, {}> {
    onChangePassive = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChangePassive', event.target.value)
        const passive = parseInt(event.target.value, 10)
        const { pails, rails, rounds } = this.props.settings
        this.props.updateSettings(passive, pails, rails, rounds)
    }
    onChangePails = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChangePails', event.target.value)
        const pails = parseInt(event.target.value, 10)
        const { passive, rails, rounds } = this.props.settings
        this.props.updateSettings(passive, pails, rails, rounds)
    }
    onChangeRails = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChangeRails', event.target.value)
        const rails = parseInt(event.target.value, 10)
        const { passive, pails, rounds } = this.props.settings
        this.props.updateSettings(passive, pails, rails, rounds)
    }
    onChangeRounds = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChangeRounds', event.target.value)
        const rounds = parseInt(event.target.value, 10)
        const { passive, pails, rails } = this.props.settings
        this.props.updateSettings(passive, pails, rails, rounds)
    }
    render() {
        return <div className="frc-page">
            <NavLink className="frc-page_header" to="/"><i className="material-icons">arrow_back</i> Main</NavLink>
            <main className="frc-page_main">
                <section className="settings">
                    <div>
                        <input id="passive" type="number" min="30" max="900" value={this.props.settings.passive} onChange={this.onChangePassive} />
                    </div>
                    <label htmlFor="passive">Passive (sec)</label>
                    <div>
                        <input id="pails" type="number" min="5" max="60" value={this.props.settings.pails} onChange={this.onChangePails} />
                    </div>
                    <label htmlFor="pails">Pails (sec)</label>
                    <div>
                        <input id="rails" type="number" min="5" max="60" value={this.props.settings.rails} onChange={this.onChangeRails} />
                    </div>
                    <label htmlFor="rails">Rails (sec)</label>
                    <div>
                        <input id="rounds" type="number" min="1" max="5" value={this.props.settings.rounds} onChange={this.onChangeRounds} />
                    </div>
                    <label htmlFor="rounds">Rounds</label>
                </section>
            </main>
        </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
        resetSettings,
        updateSettings
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        settings: state.settings
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Settings)