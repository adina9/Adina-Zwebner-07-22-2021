import { cityService } from "../../services/cityService";

export function loadCities(q) {
    return async dispatch => {
        try {
            const cities = await cityService.query(q)
            dispatch({ type: 'SET_CITIES', cities })
        } catch (err) {
            console.log('err in loading cities', err);
        }
    }
}

export function loadFavorites() {
    return async dispatch => {
        try {
            const favorites = await cityService.loadFavorites()
            dispatch({ type: 'SET_FAVS', favCities: favorites })
        } catch (err) {
            console.log('err in loadFavorites:', err);
        }
    }
}

export function chooseCity(city) {
    return async dispatch => {
        try {
            const cityWeather = await cityService.choose(city.Key)
            dispatch({ type: 'SET_WEATHER', cityWeather, city })
        } catch (err) {
            console.log('err in setting city', err);
        }
    }
}

export function updateCity(status, city) {
    console.log('status', status);
    return async dispatch => {
        try {
            const favCities = status ? await cityService.addToFav(city) : await cityService.removeFromFav(city)
            dispatch({ type: 'SET_FAVS', favCities })
        } catch (err) {
            console.log('err in adding city to fav', err);
        }
    }
}


