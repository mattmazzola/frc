import * as React from 'react'
import { ISelectableMovement } from '../types/models'

export interface Props {
    onClick: () => void
    movement: ISelectableMovement
}

export default function (props: Props) {
    return <div onClick={props.onClick}>
        <span>{props.movement.checked ? "Checked" : "Unchecked"}</span> {props.movement.movement.name}
    </div>
}