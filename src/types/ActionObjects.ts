import AT from './ActionTypes'
import { CarsSettingsState } from './StateTypes'
import { ISelectableMovement } from './models'

export interface CarsReset {
    type: AT.CARS_RESET
}

export interface CarsToggleMovement {
    type: AT.CARS_TOGGLE_MOVEMENT
    movement: ISelectableMovement
}

export interface CarsSettingsReset {
    type: AT.CARS_SETTINGS_RESET
}

export interface CarsSettingsUpdate {
    type: AT.CARS_SETTINGS_UPDATE
    settings: CarsSettingsState
}

export interface PailsRailsReset {
    type: AT.PAILSRAILS_RESET
}

export interface PailsRailsToggleMovement {
    type: AT.PAILSRAILS_TOGGLE_MOVEMENT
    movement: ISelectableMovement
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
    CarsReset |
    CarsToggleMovement |
    CarsSettingsReset |
    CarsSettingsUpdate |
    PailsRailsReset |
    PailsRailsToggleMovement |
    SettingsReset |
    SettingsUpdate