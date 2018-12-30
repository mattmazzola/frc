import * as React from 'react'
import './App.css'
import { NavLink } from 'react-router-dom'

class App extends React.Component {
  render(): any {
    return (
      <div className="frc">
        <header className="frc_header">
          <h1>Unofficial<br />FRC Trainer</h1>
        </header>
        <main className="frc_main">
          <NavLink to="/cars" exact={true} className="frc-nav-link">CARs</NavLink>
          <NavLink to="/pailsrails" exact={true} className="frc-nav-link">PAILs/RAILs</NavLink>
        </main>
      </div>
    );
  }
}

export default App;
