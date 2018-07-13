import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../types'
import { IMovement } from '../types'
import CarsRunner from './CarsRunner'
import { delay } from '../services/utilities';

interface State {
    seconds: number
    timeIntoRotation: number
    duration: number
    clockwiseRotations: number
    counterClockwiseRotations: number
    isPaused: boolean
}

interface ReceivedProps {
    movement: IMovement
    onNextMovement: () => void
}

const global = window
class Test extends React.Component<Props, State> {
    isItMounted: boolean = false
    timer: number | null = null
    
    constructor(props: Props) {
        super(props)

        const { settings } = props

        this.state = {
            ...settings,
            timeIntoRotation: settings.duration,
            seconds: 0,
            isPaused: false
        }
    }
    
    async componentDidMount() {
        this.isItMounted = true
        this.start()
    }

    async say(text: string, wait: number = 1000) {
        if (!this.isItMounted) {
            return
        }

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

        global.speechSynthesis.cancel()
        this.start()
    }
    
    componentWillUnmount() {
        global.speechSynthesis.cancel()
        this.pause()
        this.isItMounted = false
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
        const { movement, settings } = this.props
        const leadTime = 10
        const totalRoundSeconds = settings.duration
        const totalSeconds = leadTime + totalRoundSeconds * (settings.clockwiseRotations + settings.counterClockwiseRotations)

        this.setState(prevState => {
            const nextSeconds = prevState.seconds + 1
            const numRotations = Math.floor(Math.max(nextSeconds - leadTime, 0) / totalRoundSeconds)

            if (nextSeconds === totalSeconds) {
                this.pause()
                this.props.onNextMovement()

                return {
                    ...prevState,
                    timeIntoRotation: settings.duration,
                    seconds: 0
                }
            }

            if (nextSeconds === 1) {
                this.say(`${movement.name} Get Ready in ${leadTime} seconds`)
            }
            else if (nextSeconds === 7) {
                this.say('3')
            }
            else if (nextSeconds === 8) {
                this.say('2')
            }
            else if (nextSeconds === 9) {
                this.say('1')
            }
            else if (nextSeconds === 10) {
                this.say('Start')
                this.say('Clockwise Rotations')
            }

            const timeIntoRotation = Math.max(nextSeconds - leadTime, 0) % totalRoundSeconds
            const clockwiseRotations = Math.min(settings.clockwiseRotations, numRotations)
            const counterClockwiseRotations = Math.min(settings.counterClockwiseRotations, numRotations - clockwiseRotations)
            const nextState = {
                seconds: nextSeconds,
                timeIntoRotation: settings.duration - timeIntoRotation,
                clockwiseRotations: settings.clockwiseRotations - clockwiseRotations,
                counterClockwiseRotations: settings.counterClockwiseRotations - counterClockwiseRotations
            }
            
            if (prevState.clockwiseRotations !== nextState.clockwiseRotations) {
                this.say(`Round: ${clockwiseRotations}`)
            }
            if (prevState.counterClockwiseRotations !== nextState.counterClockwiseRotations) {
                this.say(`Round: ${counterClockwiseRotations}`)
            }

            return nextState
        })
    }

    render () {
        return <CarsRunner
            seconds={this.state.timeIntoRotation}
            clockwiseRotations={this.state.clockwiseRotations}
            clockwiseRotationsMax={this.props.settings.clockwiseRotations}
            counterClockwiseRotations={this.state.counterClockwiseRotations}
            counterClockwiseRotationsMax={this.props.settings.counterClockwiseRotations}
            duration={this.props.settings.duration}
            isPaused={this.state.isPaused}
            onStart={this.start}
            onPause={this.pause}

            movement={this.props.movement}
            onNextMovement={this.props.onNextMovement}
        />
    }
}


const mapDispatchToProps = (dispatch: Dispatch<ReduxState>) => {
    return bindActionCreators({
    }, dispatch)
}
const mapStateToProps = (state: ReduxState) => {
    return {
        settings: state.carsSettings
    }
}

const stateProps = returntypeof(mapStateToProps)
const dispatchProps = returntypeof(mapDispatchToProps)
type Props = typeof stateProps & typeof dispatchProps & ReceivedProps

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Test)