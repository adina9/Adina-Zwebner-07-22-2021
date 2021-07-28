const initialState = {
    cities: [],
    currCity: {},
    weatherDays: [],
    favorites: []
}
export function cityReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CITIES':
            return { ...state, cities: action.cities }
        case 'SET_WEATHER':
            return {
                ...state,
                weatherDays: action.cityWeather,
                currCity: { ...action.city }
            }
        case 'SET_FAVS':
            return { ...state, favorites: action.favCities }
        default:
            return state
    }
}