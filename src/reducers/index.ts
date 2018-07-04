import { combineReducers } from 'redux'
import carsReducer from './carsReducer'
import pailsRailsReducer from './pailsRailsReducer'
import carsSettingsReducer from './carsSettingsReducer'
import settingsReducer from './settingsReducer'
import { ReduxState } from '../types'

export default combineReducers<ReduxState>({
    cars: carsReducer,
    carsSettings: carsSettingsReducer,
    pailsRails: pailsRailsReducer,
    settings: settingsReducer
})