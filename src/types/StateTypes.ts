export interface CarsSettingsState {
    clockwiseRotations: number
    counterClockwiseRotations: number
    duration: number
}

export interface SettingsState {
    passive: number
    pails: number
    rails: number
    rounds: number
}

export interface ReduxState {
    carsSettings: CarsSettingsState
    settings: SettingsState
}