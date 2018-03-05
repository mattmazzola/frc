import { ActionObject } from '../types'
import { SettingsState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: SettingsState = {
    passive: 120,
    pails: 15,
    rails: 15,
    rounds: 2
}

const reducer: Reducer<SettingsState> = (state = initialState, action: ActionObject): SettingsState => {
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