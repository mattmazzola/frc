import * as React from 'react'
import { IMovement } from "../types"
import './MovementTimer.css'

interface Props {
    movement: IMovement
    onClickPause: () => void
}

export default function (props: Props) {
    return <div className="movement-timer">
        <div className="movement-timer_name">Name: {props.movement.name}</div>
        <img src="//via.placeholder.com/350x150" alt="testing" width="100%" />
        <div>
            <div className="movement-timer_timers">
                <div className="movement-timer_value">2:00</div><div>Passive</div>
                <div className="movement-timer_value">0:15</div><div>Pails</div>
                <div className="movement-timer_value">0:15</div><div>Rails</div>
                <div className="movement-timer_value">1/2</div><div>Rounds</div>
            </div>
        </div>
        <div className="movement-timer_buttons">
            <button type="button" onClick={props.onClickPause}><i className="material-icons">pause_circle_filled</i> Pause</button>
        </div>
    </div>
}