export interface SettingsState {
    passive: number
    pails: number
    rails: number
    rounds: number
}

export interface ReduxState {
    settings: SettingsState
}