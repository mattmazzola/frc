import * as React from 'react'
import { IMovement } from "../types"
import * as moment from 'moment'
import './PailsRailsRunner.css'

interface ReceivedProps {
    movement: IMovement
    maxPassive: number
    passive: number
    maxPails: number
    pails: number
    maxRails: number
    rails: number
    maxRounds: number
    rounds: number
    isPaused: boolean
    onStart: () => void
    onPause: () => void
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
        <div className="movement-timer_img" style={{backgroundImage: `url('${imgUrl}')`}}>
        </div>
        <div>
            <div className="movement-timer_timers">
                <div className="movement-timer_value"><span>{getDurationString(props.passive)}</span><span>/</span><span>{getDurationString(props.maxPassive)}</span></div><div>Passive</div>
                <div className="movement-timer_value"><span>{getDurationString(props.pails)}</span><span>/</span><span>{getDurationString(props.maxPails)}</span></div><div>Pails</div>
                <div className="movement-timer_value"><span>{getDurationString(props.rails)}</span><span>/</span><span>{getDurationString(props.maxRails)}</span></div><div>Rails</div>
                <div className="movement-timer_value"><span>{props.rounds}</span><span>/</span><span>{props.maxRounds}</span></div><div>Rounds</div>
            </div>
        </div>
        <div className="movement-timer_buttons">
            {props.isPaused
                ? <button type="button" onClick={() => props.onStart()}><i className="material-icons">play_circle_filled</i> Start</button>
                : <button type="button" onClick={() => props.onPause()}><i className="material-icons">pause_circle_filled</i> Pause</button>}
        </div>
    </div>
}
