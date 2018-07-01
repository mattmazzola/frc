import { ActionObject, CarsSettingsState } from '../types'
import { AT } from '../types/ActionTypes'

export const carsResetSettings = (): ActionObject =>
    ({
        type: AT.CARS_SETTINGS_RESET
    })

export const carsUpdateSettings = (settings: CarsSettingsState): ActionObject =>
    ({
        type: AT.CARS_SETTINGS_UPDATE,
        settings
    })
