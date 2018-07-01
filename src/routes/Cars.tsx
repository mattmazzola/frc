import * as React from 'react'
import { NavLink } from 'react-router-dom'
import * as movements from '../services/movements'
import Movement from '../components/Movement'
import { IMovement, ISelectableMovement, ISelectableMovements } from '../types'

interface State extends ISelectableMovements {
    selectedMovements: IMovement[]
}

const movementsSelected = Object.entries(movements).reduce((o, [key, value]: [string, IMovement[]]) => {
    o[key] = value.map<ISelectableMovement>(m => ({ movement: m, checked: true }))
    return o
}, {}) as ISelectableMovements

const carsMovements = [movementsSelected.carsLowerBody, movementsSelected.carsUpperBody, movementsSelected.spinalMovements]
const selectedMovements = carsMovements
    .map(category => category.filter(s => s.checked).map(s => s.movement))
    .reduce((a, b) => a.concat(b))

const initialState = {
    ...movementsSelected,
    selectedMovements
}

export default class extends React.Component<{}, State> {
    state = initialState

    onClickCarsLowerBodyMovement(selectableMovement: ISelectableMovement) {
        this.toggleMovement('carsLowerBody', selectableMovement)
    }

    onClickCarsUpperBodyMovements(selectableMovement: ISelectableMovement) {
        this.toggleMovement('carsUpperBody', selectableMovement)
    }

    onClickSpinalMovementsMovements(selectableMovement: ISelectableMovement) {
        this.toggleMovement('spinalMovements', selectableMovement)
    }

    private toggleMovement(key: string, selectableMovement: ISelectableMovement) {
        console.log(`movement: `, key, selectableMovement.movement.name)

        this.setState((prevState: State) => {
            const newMovement: ISelectableMovement = {
                ...selectableMovement,
                checked: !selectableMovement.checked
            }

            const movements: ISelectableMovement[] = prevState[key]
            const movementIndex = movements.findIndex(m => m === selectableMovement)
            const nextState = {
                ...prevState,
                [key]: [...movements.slice(0, movementIndex), newMovement, ...movements.slice(movementIndex + 1)]
            }

            const selectedMovements = Object.keys(movementsSelected)
                .map<ISelectableMovement[]>(key => nextState[key])
                .map(category => category.filter(s => s.checked).map(s => s.movement))
                .reduce((a, b) => a.concat(b))

            nextState.selectedMovements = selectedMovements
            return nextState
        })
    }

    render() {
        return <div className="frc-nav-page">
            <NavLink className="frc-nav-page_header" to="/"><i className="material-icons">arrow_back</i> Main</NavLink>
            <h1 className="frc-nav-page_title">CARS</h1>
            <main className="frc-nav-list">
                <div className="movements">
                    <h3>Lower Body</h3>
                    {this.state.carsLowerBody.map((m, i) =>
                        <Movement key={i} onClick={() => this.onClickCarsLowerBodyMovement(m)} movement={m} />
                    )}
                    <h3>Upper Body</h3>
                    {this.state.carsUpperBody.map((m, i) =>
                        <Movement key={i} onClick={() => this.onClickCarsUpperBodyMovements(m)} movement={m} />
                    )}
                    <h3>Spinal</h3>
                    {this.state.spinalMovements.map((m, i) =>
                        <Movement key={i} onClick={() => this.onClickSpinalMovementsMovements(m)} movement={m} />
                    )}
                </div>
            </main>
            <footer className="frc_footer">
                <NavLink className="link link-default" to="/cars/settings" exact={true}><i className="material-icons">settings</i> Settings</NavLink>
                <NavLink className="link link-primary" to={{
                    pathname: "/cars/runner",
                    state: this.state.selectedMovements
                }} exact={true}><i className="material-icons">play_circle_outline</i> Start</NavLink>
            </footer>
        </div>
    }
}