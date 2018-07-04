import { ISelectableMovement } from "./models"

export interface CarsState {
    movements: ISelectableMovement[]
}

export interface CarsSettingsState {
    clockwiseRotations: number
    counterClockwiseRotations: number
    duration: number
}

export interface PailsRailsState {
    movements: ISelectableMovement[]
}
export interface SettingsState {
    passive: number
    pails: number
    rails: number
    rounds: number
}

export interface ReduxState {
    cars: CarsState
    carsSettings: CarsSettingsState
    pailsRails: PailsRailsState
    settings: SettingsState
}