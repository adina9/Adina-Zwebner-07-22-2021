import { settingsService } from "../../services/settingsService";


export function loadSettings() {
    return async dispatch => {
        try {
            const settings = await settingsService.loadSettings()
            dispatch({ type: 'SET_SETTINGS', settings })
        } catch (err) {
            console.log('err in loadSettings:', err);
        }
    }
}


export function updateDarkMode(value) {
    return async dispatch => {
        try {
            const updatedSets = await settingsService.updateDarkMode(value)
            dispatch({ type: 'SET_SETTINGS', settings: updatedSets })
        } catch (err) {
            console.log('err in updateDarkMode:', err);
        }
    }
}

export function updateCelsius(value) {
    return async dispatch => {
        try {
            const updatedSets = await settingsService.updateCelsius(value)
            dispatch({ type: 'SET_SETTINGS', settings: updatedSets })
        } catch (err) {
            console.log('err in updateDarkMode:', err);
        }
    }
}

