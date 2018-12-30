import { ActionObject, ISelectableMovement } from '../types'
import { CarsState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import produce from 'immer'
import * as movements from '../services/movements'

const carsMovements = [...movements.spinalMovements, ...movements.carsUpperBody, ...movements.carsLowerBody]
const selectedMovements = carsMovements
    .map<ISelectableMovement>(m =>
        ({
            id: btoa(m.name),
            movement: m,
            checked: true
        }))

const initialState: CarsState = {
    movements: selectedMovements
}

const reducer: Reducer<CarsState> = (state = initialState, action: ActionObject): CarsState => {
    return produce(state, draft => {
        switch (action.type) {
            case AT.CARS_RESET: {
                return initialState
            }
            case AT.CARS_TOGGLE_MOVEMENT: {
                const { movement } = action
                const draftMovement = draft.movements.find(m => m.id === movement.id)
                if (!draftMovement) {
                    throw new Error(`Could not update movement: ${movement.movement.name} because it was not found in list of movements`)
                }

                draftMovement.checked = !draftMovement.checked
                return
            }
            default:
                return state
        }
    })
}

export default reducer