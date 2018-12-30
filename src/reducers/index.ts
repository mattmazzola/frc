import { combineReducers } from 'redux'
import carsReducer from './carsReducer'
import pailsRailsReducer from './pailsRailsReducer'
import carsSettingsReducer from './carsSettingsReducer'
import pailsRailsSettingsReducer from './pailsRailsSettingsReducer'
import { ReduxState } from '../types'

export default combineReducers<Partial<ReduxState>>({
    cars: carsReducer,
    carsSettings: carsSettingsReducer,
    pailsRails: pailsRailsReducer,
    pailsRailsSettings: pailsRailsSettingsReducer
})