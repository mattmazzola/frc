import { ActionObject, ISelectableMovement } from '../types'
import { AT } from '../types/ActionTypes'

export const carsReset = (): ActionObject =>
    ({
        type: AT.CARS_RESET
    })

export const carsToggleMovement = (movement: ISelectableMovement): ActionObject =>
    ({
        type: AT.CARS_TOGGLE_MOVEMENT,
        movement
    })
