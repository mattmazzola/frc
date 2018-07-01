import AT from './ActionTypes'
import { CarsSettingsState } from './StateTypes'

export interface CarsSettingsReset {
    type: AT.CARS_SETTINGS_RESET
}

export interface CarsSettingsUpdate {
    type: AT.CARS_SETTINGS_UPDATE
    settings: CarsSettingsState
}

export interface SettingsReset {
    type: AT.SETTINGS_RESET
}

export interface SettingsUpdate {
    type: AT.SETTINGS_UPDATE
    passive: number
    pails: number
    rails: number
    rounds: number
}

export type ActionObject =
    CarsSettingsReset |
    CarsSettingsUpdate |
    SettingsReset |
    SettingsUpdate