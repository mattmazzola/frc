import * as React from 'react'
import { IMovement } from '../types'
import CarsRunner from './CarsRunner';

interface State {
    seconds: number
    isPaused: boolean
}

interface ReceivedProps {
    movement: IMovement
    onNextMovement: () => void
}

const global = window
export default class extends React.Component<ReceivedProps, State> {
    timer: number | null = null
    
    state = {
        seconds: 0,
        isPaused: false
    }

    async componentDidMount() {
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

        this.setState(prevState => {
            const nextSeconds = prevState.seconds + 1

            return {
                seconds: nextSeconds
            }
        })
    }

    render () {
        return <CarsRunner
            seconds={this.state.seconds}
            clockwiseRotations={10}
            counterClockwiseRotations={10}
            duration={10}
            isPaused={this.state.isPaused}
            onStart={this.start}
            onPause={this.pause}

            movement={this.props.movement}
            onNextMovement={this.props.onNextMovement}
        />
    }
}