import { ActionObject, ISelectableMovement } from '../types'
import { AT } from '../types/ActionTypes'

export const pailsRailsReset = (): ActionObject =>
    ({
        type: AT.PAILSRAILS_RESET
    })

export const pailsRailsToggleMovement = (movement: ISelectableMovement): ActionObject =>
    ({
        type: AT.PAILSRAILS_TOGGLE_MOVEMENT,
        movement
    })
