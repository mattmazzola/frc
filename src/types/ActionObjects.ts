import AT from './ActionTypes'

export interface SettingsReset {
    type: AT.SETTINGS_RESET
}


export type ActionObject =
    SettingsReset