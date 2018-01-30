import * as React from 'react'
import './App.css'
import * as movements from './services/movements'

class App extends React.Component {
  onClickStart() {
    console.log(`onClickStart`)
  }

  onClickSettings() {
    console.log(`onClickSettings`)
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
            {movements.carsLowerBody.map((movement, i) => (
              <li key={i}>{movement.name}</li>
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
          <button type="button" onClick={this.onClickStart}>Start</button>
          <button type="button" onClick={this.onClickSettings}>Settings</button>
        </footer>
      </div>
    );
  }
}

export default App;
