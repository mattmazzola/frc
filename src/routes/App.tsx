import * as React from 'react'
import './App.css'
import {
  NavLink
} from 'react-router-dom'
import * as movements from '../services/movements'
import Movement from '../components/Movement'
import { IMovement, ISelectableMovement, ISelectableMovements } from '../types'

interface State {
  movementsSelected: ISelectableMovements
}

const initialState = {
  movementsSelected: Object.entries(movements).reduce((o, [key, value]: [string, IMovement[]]) => {
    o[key] = value.map<ISelectableMovement>(m => ({ movement: m, checked: true }))
    return o
  }, {}) as ISelectableMovements
}

class App extends React.Component<{}, State> {
  state = initialState

  onClickStart() {
    console.log(`onClickStart`)
  }

  onClickSettings() {
    console.log(`onClickSettings`)
  }

  onClickCarsLowerBodyMovement(selectableMovement: ISelectableMovement) {
    console.log(`movement: `, selectableMovement.movement.name)
    this.setState((prevState: State) => {
      const newMovement: ISelectableMovement = {
        ...selectableMovement,
        checked: !selectableMovement.checked
      }
      const movementIndex = prevState.movementsSelected.carsLowerBody.findIndex(m => m === selectableMovement)
      return {
        ...prevState,
        movementsSelected: {
          ...prevState.movementsSelected,
          carsLowerBody: [...prevState.movementsSelected.carsLowerBody.slice(0, movementIndex), newMovement, ...prevState.movementsSelected.carsLowerBody.slice(movementIndex + 1)]
        }
      }
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
              <h2 className="heading">CARS</h2>
              <h3 className="heading">Lower Body</h3>
              {this.state.movementsSelected.carsLowerBody.map((m, i) => (
                <Movement key={i} onClick={() => this.onClickCarsLowerBodyMovement(m)} movement={m} />
              ))}
              <h3>Upper Body</h3>
              {movements.carsUpperBody.map((movement, i) => (
                <li key={i}>{movement.name}</li>
              ))}
              <h3>Spinal</h3>
              {movements.spinalMovements.map((movement, i) => (
                <li key={i}>{movement.name}</li>
              ))}

              <h2>PAILs/RAILs</h2>
              <h3>Lower Body</h3>
              {movements.pailsLowerBody.map((movement, i) => (
                <li key={i}>{movement.name}</li>
              ))}
              <h3>Upper Body</h3>
              {movements.pailsUpperBody.map((movement, i) => (
                <li key={i}>{movement.name}</li>
              ))}
            </div>
          </main>
          <footer className="frc_footer">
            <NavLink className="link" to="/runner" exact={true}>Start</NavLink>
            <NavLink className="link" to="/settings" exact={true}>Settings</NavLink>
          </footer>
        </div>
    );
  }
}

export default App;
