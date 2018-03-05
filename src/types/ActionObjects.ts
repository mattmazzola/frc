import AT from './ActionTypes'

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
    SettingsReset |
    SettingsUpdate