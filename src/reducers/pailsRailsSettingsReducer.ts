import { ActionObject } from '../types'
import { PailsRailsSettingsState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: PailsRailsSettingsState = {
    passive: 120,
    pails: 15,
    rails: 15,
    rounds: 2
}

const reducer: Reducer<PailsRailsSettingsState> = (state = initialState, action: ActionObject): PailsRailsSettingsState => {
    switch (action.type) {
        case AT.SETTINGS_RESET: {
            return initialState
        }
        case AT.SETTINGS_UPDATE: {
            const { type, ...newValues } = action
            return {
                ...state,
                ...newValues
            }
        }
        default:
            return state
    }
}

export default reducer