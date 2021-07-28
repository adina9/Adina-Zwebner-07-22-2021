import { storageService } from './storageService.js';
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: false
})

var gFavCities = []

const KEY = 'cityDB'
const KEY_FAV = 'favoritesDB'
const KEY_WEATHER = 'citiesWeatherArrDB'
const API_KEY = 'H11YA4QSC6nAVP34ZmGfdLYzwubK1iST'

export const cityService = {
    query,
    choose,
    loadFavorites,
    addToFav,
    removeFromFav,
}


async function query(q) {
    var storageArr = storageService.load(KEY)
    if (storageArr !== null || storageArr) {
        var index = storageArr.findIndex(city => city.LocalizedName.slice(0, q.length) === q.slice(0, 1).toUpperCase() + q.slice(1, q.length).toLowerCase())
        var arrayForDisplay = []
        if (index > -1) {
            storageArr.forEach(city => {
                if (city.LocalizedName.slice(0, q.length) === q.slice(0, 1).toUpperCase() + q.slice(1, q.length).toLowerCase()) arrayForDisplay.push(city)
            })
            return Promise.resolve(arrayForDisplay.slice(0, 7))
        } else {
            const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}&language=en`
            const res = await axios.get(url)
            storageArr.push(...res.data)
            _saveToStorage(KEY, storageArr)
            return Promise.resolve(res.data.splice(0, 7))
        }
    } else {
        const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}&language=en`
        const res = await axios.get(url)
        _saveToStorage(KEY, res.data)
        return Promise.resolve(res.data.splice(0, 7))
    }
}

async function choose(cityKey) {
    var weatherStorage = storageService.load(KEY_WEATHER)
    if (weatherStorage !== null || weatherStorage) {
        var index = weatherStorage.findIndex(cityDay => cityDay[0].Link.includes(cityKey))
        if (index > -1) return Promise.resolve(weatherStorage[index])
        else {
            const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&details=true`
            const res = await axios.get(url)
            weatherStorage = [...weatherStorage, [...res.data.DailyForecasts]]
            _saveToStorage(KEY_WEATHER, weatherStorage)
            return Promise.resolve(res.data.DailyForecasts)
        }
    }
    else {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&details=true`
        const res = await axios.get(url)
        _saveToStorage(KEY_WEATHER, [res.data.DailyForecasts])
        return Promise.resolve(res.data.DailyForecasts)
    }
}

async function loadFavorites() {
    const favStorage = storageService.load(KEY_FAV)
    if (favStorage || favStorage !== null) {
        gFavCities = [...favStorage]
        return Promise.resolve(gFavCities)
    } else return
}

async function addToFav(city) {
    var copy = [...gFavCities]
    if (copy.find(fav => fav.LocalizedName === city.LocalizedName)) return
    copy.push(city)
    _saveToStorage(KEY_FAV, copy)
    gFavCities = copy
    return Promise.resolve(gFavCities)
}

async function removeFromFav(city) {
    var copy = [...gFavCities]
    copy = copy.filter(fav => fav.Key !== city.Key)
    _saveToStorage(KEY_FAV, copy)
    gFavCities = copy
    return Promise.resolve(gFavCities)
}

function _saveToStorage(key, value) { storageService.save(key, value) }



