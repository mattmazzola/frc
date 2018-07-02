import * as React from 'react'
import { IMovement } from '../types'
import * as moment from 'moment'

interface ReceivedProps {
    seconds: number

    movement: IMovement
    clockwiseRotations: number
    clockwiseRotationsMax: number
    counterClockwiseRotations: number
    counterClockwiseRotationsMax: number
    duration: number
    isPaused: boolean
    onStart: () => void
    onPause: () => void
    
    onNextMovement: () => void
}

function getDurationString(seconds: number) {
    const duration = moment.duration(seconds, 'seconds')
    const durationSeconds = duration.seconds()

    return `${duration.minutes()}:${durationSeconds >= 10 ? durationSeconds : `0${durationSeconds}`}`
}

export default function (props: ReceivedProps) {
    const imgUrl = props.movement.imgUrl || "//via.placeholder.com/350x150"
    return <div className="movement-timer">
        <div className="movement-timer_name">{props.movement.name}</div>
        <img src={imgUrl} alt={`Person demonstrating the move: ${props.movement.name}`} width="100%" />
        <div>
            <div className="movement-timer_timers">
                <div className="movement-timer_value"><span>{props.clockwiseRotations}</span><span>/</span><span>{props.clockwiseRotationsMax}</span></div><div>CW</div>
                <div className="movement-timer_value"><span>{props.counterClockwiseRotations}</span><span>/</span><span>{props.counterClockwiseRotationsMax}</span></div><div>CCW</div>
                <div className="movement-timer_value"><span>{getDurationString(props.seconds)}</span><span>/</span><span>{getDurationString(props.duration)}</span></div><div>sec / rotation</div>
            </div>
        </div>
        <div className="movement-timer_buttons">
            {props.isPaused
                ? <button type="button" onClick={() => props.onStart()}><i className="material-icons">play_circle_filled</i> Start</button>
                : <button type="button" onClick={() => props.onPause()}><i className="material-icons">pause_circle_filled</i> Pause</button>}
        </div>
    </div>
}