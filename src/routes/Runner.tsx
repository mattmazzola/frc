import * as React from 'react'
import {
    NavLink
} from 'react-router-dom'
import './Runner.css'
import { RouteComponentProps } from 'react-router'
import MovementTimerContainer from '../components/MovementTimerContainer'
import { IMovement } from '../types';

interface Props extends RouteComponentProps<any> {
}

interface State {
    movements: IMovement[]
    currentMovementIndex: number
}

export default class Runner extends React.Component<Props, State> {
    componentWillMount() {
        console.log(`componentWillMount: `, this.props)
        const { history, location } = this.props
        const movements: IMovement[] = location.state

        if (!Array.isArray(movements) || movements.length === 0) {
            history.replace('/')
        }

        this.setState({
            movements,
            currentMovementIndex: 0
        })
    }
    componentWillReceiveProps(nextProps: any) {
        console.log(`componentWillReceiveProps: `, nextProps)
    }

    onClickPrev = () => {
        console.log(`onClickPrev`)

        this.setState(prevState => ({
            ...prevState,
            currentMovementIndex: Math.max(prevState.currentMovementIndex - 1, 0)
        }))
    }

    onClickNext = () => {
        console.log(`onClickNext`)

        this.setState(prevState => ({
            ...prevState,
            currentMovementIndex: Math.min(prevState.currentMovementIndex + 1, prevState.movements.length - 1)
        }))
    }

    onNextMovement = () => {
        const nextMovement = this.getNextMovement(this.state)

        if (!nextMovement) {
            return
        }

        this.onClickNext()
    }

    private getPrevMovement(state: State) {
        const prevIndex = state.currentMovementIndex - 1
        return prevIndex < 0
            ? undefined
            : state.movements[prevIndex]
    }

    private getNextMovement(state: State) {
        const nextIndex = state.currentMovementIndex + 1
        return nextIndex > state.movements.length - 1
            ? undefined
            : state.movements[nextIndex]
    }

    render() {
        const prevMovement = this.getPrevMovement(this.state)
        const currentMovement = this.state.movements[this.state.currentMovementIndex]
        const nextMovement = this.getNextMovement(this.state)
        console.log(`currentMovement: `, currentMovement)

        return <div className="frc-page">
            <NavLink className="frc-page_header" to="/"><i className="material-icons">arrow_back</i> Program</NavLink>
            <main className="frc-page_main">
                <header className="frc-movement_header">
                    <div className="frc-movement_prev" onClick={this.onClickPrev}>
                        <div className="frc-movement_prev-icon"><i className="material-icons">arrow_back</i></div><div className="frc-movement_prev-text frc-o-nowrap">{prevMovement ? prevMovement.name : 'Start'}</div>
                    </div>
                    <div className="frc-movement_next" onClick={this.onClickNext}>
                        <div className="frc-movement_prev-text frc-o-nowrap">{nextMovement ? nextMovement.name : 'End'}</div><div className="frc-movement_prev-icon"><i className="material-icons">arrow_forward</i></div>
                    </div>
                </header>
                <MovementTimerContainer
                    movement={currentMovement}
                    onNextMovement={this.onNextMovement}
                />
            </main>
        </div>
    }
}