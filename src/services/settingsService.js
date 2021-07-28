import { storageService } from "./storageService"

const KEY_SETTINGS = 'settings_DB'

export const settingsService = {
    loadSettings,
    updateDarkMode,
    updateCelsius
}



async function loadSettings() {
    try {
        var settings = storageService.load(KEY_SETTINGS)
        if (settings || settings !== null) return Promise.resolve(settings)
        else {
            settings = { isDarkMode: false, isCelsius: false }
            storageService.save(KEY_SETTINGS, settings)
            return Promise.resolve(settings)
        }

    } catch (err) {
        console.log('err in loadSettings in settingsService:', err);
    }
}

async function updateDarkMode(value) {
    try {
        const settings = await storageService.load(KEY_SETTINGS)
        settings.isDarkMode = value
        storageService.save(KEY_SETTINGS, settings)
        return settings
    } catch (err) {
        console.log('err in updateDarkMode:', err);
    }
}
async function updateCelsius(value) {
    try {
        const settings = await storageService.load(KEY_SETTINGS)
        settings.isCelsius = value
        storageService.save(KEY_SETTINGS, settings)
        return settings
    } catch (err) {
        console.log('err in updateDarkMode:', err);
    }
}