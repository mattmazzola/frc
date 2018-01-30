import * as React from 'react'
import './App.css'

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
        <div>
          <h2>CARS</h2>
          <ol>
            <li>
              <h2>Lower Body</h2>
              <ol>
                <li>1</li>
                <li>2</li>
              </ol>
            </li>
            <li>
            <h2>Upper Body</h2>
              <ol>
                <li>1</li>
                <li>2</li>
              </ol>
            </li>
          </ol>
          <h2>PAILs/RAILs</h2>
          <ol>
            <li>1</li>
            <li>2</li>
          </ol>
        </div>
        <footer className="frc_footer">
          <button type="button" onClick={this.onClickStart}>Start</button>
          <button type="button" onClick={this.onClickSettings}>Settings</button>
        </footer>
      </div>
    );
  }
}

export default App;
