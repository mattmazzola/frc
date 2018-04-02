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
        this.getNextMovement(this.state)
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
                <header onClick={this.onClickPrev}>
                    <i className="material-icons">arrow_back</i> Prev: {prevMovement ? prevMovement.name : 'None'}
                </header>
                <MovementTimerContainer
                    movement={currentMovement}
                    onNextMovement={this.onNextMovement}
                />
                <footer onClick={this.onClickNext}>
                    <i className="material-icons">arrow_forward</i>  Next: {nextMovement ? nextMovement.name : 'None'}
                </footer>
            </main>
        </div>
    }
}