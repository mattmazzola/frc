import { combineReducers } from 'redux'
import settingsReducer from './settingsReducer'
import { ReduxState } from '../types'

export default combineReducers<ReduxState>({
    settings: settingsReducer
})