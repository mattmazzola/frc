import { ActionObject } from '../types'
import { AT } from '../types/ActionTypes'

export const resetSettings = (): ActionObject =>
    ({
        type: AT.SETTINGS_RESET
    })

export const updateSettings = (passive: number, pails: number, rails: number, rounds: number): ActionObject =>
    ({
        type: AT.SETTINGS_UPDATE,
        passive,
        rails,
        pails,
        rounds
    })
