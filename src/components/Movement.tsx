import * as React from 'react'
import { ISelectableMovement } from '../types/models'
import './Movement.css'

export interface Props {
    onClick: () => void
    movement: ISelectableMovement
}

export default function (props: Props) {
    return <div className="movement" onClick={props.onClick}>
        <span className="movement_icon">{props.movement.checked
            ? <i className="material-icons">check_box</i>
            : <i className="material-icons">check_box_outline_blank</i>
        }</span>
        {props.movement.movement.name}
    </div>
}