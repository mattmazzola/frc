import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../types'
import { IMovement } from "../types"
import './MovementTimer.css'
import MovementTimer from './MovementTimer'

interface State {
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
const keyOrder = ['passive', 'pails', 'rails']
// const lastKey = keyOrder[keyOrder.length - 1]

class Component extends React.Component<Props, State> {
    currentKeyIndex: number = 0
    timer: number | null = null
    constructor(props: Props) {
        super(props)

        const { settings } = props
        
        this.state = {
            ...settings,
            isPaused: false
        }
    }

    componentWillMount() {
        this.currentKeyIndex = 0
        this.start()
    }

    componentWillReceiveProps(nextProps: Props) {
        const { settings } = nextProps
        
        this.setState({
            ...settings,
            isPaused: false
        })

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
        const currentKey = keyOrder[this.currentKeyIndex]

        // Check off by one error
        if (this.state.rounds === 0) { // && this.state[lastKey] === 0) {
            console.log('run#onNextMovement()')
            this.pause()
            this.props.onNextMovement()
            return
        }

        this.setState(prevState => {
            const nextValue = prevState[currentKey] - 1 >= 0 ? prevState[currentKey] - 1 : this.props.settings[currentKey]
            let nextState = {
                [currentKey]: nextValue
            }

            // If current key's value has reached 0 reset and move to next key
            // Otherwise, decrement value
            if (nextValue === 0) {
                const nextKeyIndex = (this.currentKeyIndex + 1) % keyOrder.length
                nextState[currentKey] = this.props.settings[currentKey]
                
                if (this.currentKeyIndex === keyOrder.length - 1) {
                    nextState.rounds = prevState.rounds - 1   
                }
                this.currentKeyIndex = nextKeyIndex
                console.log(`nextValue === 0: this.currentKeyIndex: `, this.currentKeyIndex)
            }

            return nextState as any
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