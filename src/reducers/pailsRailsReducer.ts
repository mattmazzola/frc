import { ActionObject, ISelectableMovement } from '../types'
import { PailsRailsState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'
import produce from 'immer'
import * as movements from '../services/movements'

const pailsRailsMovements = [...movements.pailsLowerBody, ...movements.pailsUpperBody]
const selectedMovements = pailsRailsMovements
    .map<ISelectableMovement>(m =>
        ({
            id: btoa(m.name),
            movement: m,
            checked: true
        }))

const initialState: PailsRailsState = {
    movements: selectedMovements
}

const reducer: Reducer<PailsRailsState> = (state = initialState, action: ActionObject): PailsRailsState => {
    return produce(state, draft => {
        switch (action.type) {
            case AT.PAILSRAILS_RESET: {
                return initialState
            }
            case AT.PAILSRAILS_TOGGLE_MOVEMENT: {
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