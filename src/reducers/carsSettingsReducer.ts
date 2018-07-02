import { ActionObject } from '../types'
import { CarsSettingsState } from '../types'
import { AT } from '../types/ActionTypes'
import { Reducer } from 'redux'

const initialState: CarsSettingsState = {
    clockwiseRotations: 2,
    counterClockwiseRotations: 2,
    duration: 5
}

const reducer: Reducer<CarsSettingsState> = (state = initialState, action: ActionObject): CarsSettingsState => {
    switch (action.type) {
        case AT.CARS_SETTINGS_RESET: {
            return initialState
        }
        case AT.CARS_SETTINGS_UPDATE: {
            const { settings } = action
            return {
                ...settings
            }
        }
        default:
            return state
    }
}

export default reducer