import * as React from 'react'
import {
    NavLink
} from 'react-router-dom'
import './Runner.css'
import { RouteComponentProps } from 'react-router'
import { IMovement } from '../types';

interface Props extends RouteComponentProps<any> {
    movements: IMovement[]
    render: (currentMovement: IMovement, onNextMovement: () => void) => React.ReactNode
}

interface State {
    currentMovementIndex: number
}

export default class Runner extends React.Component<Props, State> {
    state = {
        currentMovementIndex: 0
    }

    onClickPrev = () => {
        this.setState(prevState => ({
            ...prevState,
            currentMovementIndex: Math.max(prevState.currentMovementIndex - 1, 0)
        }))
    }

    onClickNext = () => {
        this.setState(prevState => ({
            ...prevState,
            currentMovementIndex: Math.min(prevState.currentMovementIndex + 1, this.props.movements.length - 1)
        }))
    }

    onNextMovement = () => {
        const nextMovement = this.getNextMovement(this.state, this.props)

        if (!nextMovement) {
            return
        }

        this.onClickNext()
    }

    private getPrevMovement(state: State, props: Props) {
        const prevIndex = state.currentMovementIndex - 1
        return prevIndex < 0
            ? undefined
            : props.movements[prevIndex]
    }

    private getNextMovement(state: State, props: Props) {
        const nextIndex = state.currentMovementIndex + 1
        return nextIndex > props.movements.length - 1
            ? undefined
            : props.movements[nextIndex]
    }

    render() {
        const prevMovement = this.getPrevMovement(this.state, this.props)
        const currentMovement = this.props.movements[this.state.currentMovementIndex]
        const nextMovement = this.getNextMovement(this.state, this.props)
        console.log(`currentMovement: `, currentMovement)

        if (!currentMovement) {
            return <div className="frc-page">
                <NavLink className="frc-page_header" to="/"><i className="material-icons">arrow_back</i> Program</NavLink>
                <main className="frc-page_main">
                    <h1>Error</h1>
                </main>
            </div>
        }

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
                {this.props.render(currentMovement, this.onNextMovement)}
            </main>
        </div>
    }
}