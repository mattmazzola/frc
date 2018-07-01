import { combineReducers } from 'redux'
import carsSettingsReducer from './carsSettingsReducer'
import settingsReducer from './settingsReducer'
import { ReduxState } from '../types'

export default combineReducers<ReduxState>({
    carsSettings: carsSettingsReducer,
    settings: settingsReducer
})