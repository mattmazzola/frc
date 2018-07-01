import * as React from 'react'
import { IMovement } from '../types'

interface ReceivedProps {
    seconds: number

    movement: IMovement
    clockwiseRotations: number
    counterClockwiseRotations: number
    duration: number
    isPaused: boolean
    onStart: () => void
    onPause: () => void
    
    onNextMovement: () => void
}

export default function (props: ReceivedProps) {
    return <div className="movement-timer">
        <div className="movement-timer_name">{props.movement.name}</div>
        <img src="//via.placeholder.com/350x150" alt="testing" width="100%" />
        <div>
            <div className="movement-timer_timers">
                <div className="movement-timer_value"><span>{props.seconds + ' ' + props.clockwiseRotations}</span><span>/</span><span>{props.clockwiseRotations}</span></div><div>CW</div>
                <div className="movement-timer_value"><span>{props.counterClockwiseRotations}</span><span>/</span><span>{props.counterClockwiseRotations}</span></div><div>CCW</div>
                <div className="movement-timer_value"><span>{props.duration}</span><span>/</span><span>{props.duration}</span></div><div>Duration</div>
            </div>
        </div>
        <div className="movement-timer_buttons">
            {props.isPaused
                ? <button type="button" onClick={() => props.onStart()}><i className="material-icons">play_circle_filled</i> Start</button>
                : <button type="button" onClick={() => props.onPause()}><i className="material-icons">pause_circle_filled</i> Pause</button>}
        </div>
    </div>
}