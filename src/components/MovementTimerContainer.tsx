import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../types'
import { IMovement } from "../types"
import './MovementTimer.css'
import MovementTimer from './MovementTimer'
import { delay } from '../services/utilities';

interface State {
    seconds: number
    passive: number
    pails: number
    rails: number
    rounds: number
    isPaused: boolean
}

interface ReceivedProps {
    movement: IMovement
    onNextMovement: () => void
}

const global = window

class Component extends React.Component<Props, State> {
    timer: number | null = null
    constructor(props: Props) {
        super(props)

        const { settings } = props

        this.state = {
            ...settings,
            seconds: 0,
            isPaused: false
        }
    }

    async componentWillMount() {
        const name = this.props.movement.name
        await this.say(name)
        await this.say('Get ready', 10000)
        await this.say('Start')
        this.start()
    }

    async say(text: string, wait: number = 1000) {
        const utterance = new SpeechSynthesisUtterance(text)
        global.speechSynthesis.speak(utterance)
        await delay(wait)
    }

    async componentWillReceiveProps(nextProps: Props) {
        this.pause()
        this.setState({
            ...nextProps.settings,
            seconds: 0,
            isPaused: false
        })

        const name = nextProps.movement.name
        await this.say(name)
        await this.say('Get ready', 10000)
        await this.say('Start')

        this.start()
    }

    componentWillUnmount() {
        this.pause()
    }

    start= () => {
        if (!this.timer) {
            this.timer = global.setInterval(() => this.run(), 1000)
            this.setState({
                isPaused: false
            })
        }
    }

    pause = () => {
        if (this.timer) {
            global.clearInterval(this.timer)
        }
        this.timer = null
        this.setState({
            isPaused: true
        })
    }

    run() {
        const { settings } = this.props
        const totalRoundSeconds = settings.passive + settings.pails + settings.rails

        this.setState(prevState => {
            const nextSeconds = prevState.seconds + 1
            const nextRound = Math.floor(nextSeconds / totalRoundSeconds)

            if (nextRound === settings.rounds) {
                this.pause()
                this.props.onNextMovement()

                return {
                    seconds: 0,
                    passive: prevState.passive,
                    pails: prevState.pails,
                    rails: prevState.rails,
                    rounds: prevState.rounds
                }
            }

            const timeIntoNextRound = nextSeconds % totalRoundSeconds

            if (timeIntoNextRound === 1) {
                this.say('Passive')
            }
            else if (timeIntoNextRound === settings.passive) {
                this.say('Pails')
            }
            else if (timeIntoNextRound === settings.passive + settings.pails) {
                this.say('Rails')
            }
            
            const rounds = settings.rounds - nextRound
            if (rounds !== prevState.rounds) {
                this.say(`Round: ${nextRound + 1}`)
            }

            const passive = Math.min(settings.passive, timeIntoNextRound)
            const pails = Math.min(settings.pails, timeIntoNextRound - passive)
            const rails = Math.min(settings.rails, timeIntoNextRound - passive - pails)

            return {
                seconds: prevState.seconds + 1,
                passive: settings.passive - passive,
                pails: settings.pails - pails,
                rails: settings.rails - rails,
                rounds
            }
        })
    }

    render() {
        const { settings } = this.props
        return <MovementTimer
            movement={this.props.movement}
            isPaused={this.state.isPaused}
            maxPassive={settings.passive}
            maxPails={settings.pails}
            maxRails={settings.rails}
            maxRounds={settings.rounds}
            passive={this.state.passive}
            pails={this.state.pails}
            rails={this.state.rails}
            rounds={this.state.rounds}
            onStart={this.start}
            onPause={this.pause}
        />
    }
}


const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        settings: state.settings
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Component)