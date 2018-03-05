import * as React from 'react'
import {
    NavLink
} from 'react-router-dom'
import './Runner.css'
import * as movements from '../services/movements'
import MovementTimer from '../components/MovementTimer';



export default class Runner extends React.Component {
    onClickPrev = () => {
        console.log(`onClickPrev`)
    }
    
    onClickNext = () => {
        console.log(`onClickNext`)
    }

    onClickPause = () => {
        console.log(`onClickPause`)
    }

    render() {
        return <div className="frc-page">
            <NavLink className="frc-page_header" to="/"><i className="material-icons">arrow_back</i> Program</NavLink>
            <main className="frc-page_main">
                <header onClick={this.onClickPrev}>
                    <i className="material-icons">arrow_back</i> Prev: Testing
                </header>
                <MovementTimer
                    movement={movements.carsLowerBody[0]}
                    onClickPause={this.onClickPause}
                />
                <footer onClick={this.onClickNext}>
                    <i className="material-icons">arrow_forward</i>  Next: Testing
                </footer>
            </main>
        </div>
    }
}