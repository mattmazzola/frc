import * as React from 'react'
import './App.css'
import {
  NavLink
} from 'react-router-dom'
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

const selectedMovements = (Object.values(movementsSelected) as ISelectableMovement[][])
  .map(category => category.filter(s => s.checked).map(s => s.movement))
  .reduce((a, b) => a.concat(b))

const initialState = {
  ...movementsSelected,
  selectedMovements
}

class App extends React.Component<{}, State> {
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

  render(): any {
    return (
      <div className="frc">
        <header className="frc_header">
          <h1>FRC</h1>
        </header>
        <main className="frc_main">
          <div className="movements">
            <h2>CARS</h2>
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

            <h2>PAILs/RAILs</h2>
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
          <NavLink className="link link-default" to="/settings" exact={true}><i className="material-icons">settings</i> Settings</NavLink>
          <NavLink className="link link-primary" to={{
            pathname: "/runner",
            state: this.state.selectedMovements
          }} exact={true}><i className="material-icons">play_circle_outline</i> Start</NavLink>
        </footer>
      </div>
    );
  }
}

export default App;
