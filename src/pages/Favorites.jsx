import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2'

import { FavCityPreview } from '../cmps/FavCityPreview';
import { cityService } from '../services/cityService';
import { loadFavorites } from '../store/actions/cityAction'
import { loadSettings } from '../store/actions/settingsAction'


export const Favorites = ({ history: { push } }) => {

    const [todaysWeatherArr, setTodaysWeatherArr] = useState([])

    const { settings: { isDarkMode, isCelsius } } = useSelector(state => state.settingsModule)
    const { favorites } = useSelector(state => state.cityModule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadFavorites())
        dispatch(loadSettings())
    }, [])

    useEffect(() => {
        if (!favorites || !favorites.length) doSwal()
        doPush()
    }, [favorites])

    const doSwal = () => {
        var c = isDarkMode ? '#16243e' : '#2726b6'
        Swal.fire({
            title: 'There Are No Favorite Cities Yet...',
            text: 'Go back home and add cities to your favorite list',
            icon: 'info',
            confirmButtonText: 'Go To Home',
            confirmButtonColor: c,
            iconColor: c,
        }).then(res => {
            if (res.isConfirmed)
                push('/')
        })
    }

    const doPush = () => {
        var todaysArr = []
        favorites?.forEach(fav => {
            cityService.choose(fav.Key).then(res => {
                todaysArr.push({ ...res[0], city: { ...fav } })
                setTodaysWeatherArr([...todaysArr])
            })
        })
    }


    return (
        <section className={`favorites ${isDarkMode ? 'dark' : ''} flex pa`}>
            <span>your favorites cities</span>
            <div className="favorites-list flex"> {todaysWeatherArr.map((city, idx) => {
                return <FavCityPreview isCelsius={isCelsius} todaysWeatherArr={todaysWeatherArr} favCity={city} key={idx} />
            })}
            </div>
        </section>
    )

}

