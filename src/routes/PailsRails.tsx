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


const pailsRailsMovements = [movementsSelected.pailsLowerBody, movementsSelected.pailsUpperBody]
const selectedMovements = pailsRailsMovements
    .map(category => category.filter(s => s.checked).map(s => s.movement))
    .reduce((a, b) => a.concat(b))

const initialState = {
    ...movementsSelected,
    selectedMovements
}

export default class extends React.Component<{}, State> {
    state = initialState

    onClickPailsLowerBodyMovements(selectableMovement: ISelectableMovement) {
        this.toggleMovement('pailsLowerBody', selectableMovement)
    }

    onClickPailsUpperBodyMovements(selectableMovement: ISelectableMovement) {
        this.toggleMovement('pailsUpperBody', selectableMovement)
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
            <h1 className="frc-nav-page_title">PAILs/RAILs</h1>
            <main className="frc-nav-list">
                <div className="movements">
                    <h3>Lower Body</h3>
                    {this.state.pailsLowerBody.map((m, i) =>
                        <Movement key={i} onClick={() => this.onClickPailsLowerBodyMovements(m)} movement={m} />
                    )}
                    <h3>Upper Body</h3>
                    {this.state.pailsUpperBody.map((m, i) =>
                        <Movement key={i} onClick={() => this.onClickPailsUpperBodyMovements(m)} movement={m} />
                    )}
                </div>
            </main>
            <footer className="frc_footer">
                <NavLink className="link link-default" to="/pailsrails/settings" exact={true}><i className="material-icons">settings</i> Settings</NavLink>
                <NavLink className="link link-primary" to={{
                    pathname: "/pailsrails/runner",
                    state: this.state.selectedMovements
                }} exact={true}><i className="material-icons">play_circle_outline</i> Start</NavLink>
            </footer>
        </div>
    }
}