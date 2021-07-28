import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Swal from 'sweetalert2'

import { chooseCity, updateCity, loadFavorites } from '../store/actions/cityAction'
import { loadSettings } from '../store/actions/settingsAction'

import { CityFilter } from '../cmps/CityFilter'
import { DaysList } from '../cmps/DaysList'

export const WeatherApp = ({ history: { push } }) => {

    const { cities, weatherDays, currCity, favorites } = useSelector(state => state.cityModule)
    const { settings } = useSelector(state => state.settingsModule)

    const [isCityClicked, setIsCityClicked] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {

        if (Object.keys(currCity).length === 0) {
            dispatch(chooseCity({
                AdministrativeArea: { ID: "TA", LocalizedName: "Tel Aviv" },
                Country: { ID: "IL", LocalizedName: "Israel" },
                Key: "215854",
                LocalizedName: "Tel Aviv",
                Rank: 31,
                Type: "City",
                Version: 1
            }))
        }

        dispatch(loadFavorites())
        dispatch(loadSettings())
    }, [])



    const onChooseCity = city => {
        dispatch(chooseCity(city))
        setIsCityClicked(true)
    }

    const onUpdateCity = (status, city) => {
        dispatch(updateCity(status, city))

        var swalObj = { c: settings.isDarkMode ? '#16243e' : '#2726b6', text: 'Favorites', title: status ? 'Added' : 'Removed ' }
        var { c, title, text } = swalObj
        Swal.fire({
            icon: 'success',
            title: 'The City ' + title + ' Successfully',
            confirmButtonText: 'Go To ' + text,
            confirmButtonColor: c,
            iconColor: c,
            timer: 3000
        }).then(res => {
            if (res.isConfirmed)
                push(`/${text}`)
        })
    }

    return (
        <section className={`weather-app ${settings.isDarkMode ? 'dark' : ''} pa`}>
            <CityFilter cities={cities} isDarkMode={settings.isDarkMode} chooseCity={onChooseCity} isCityClicked={isCityClicked} onUpdateInputChange={() => setIsCityClicked(false)} />
            <DaysList favorites={favorites} settings={settings} weatherDays={weatherDays} updateCity={onUpdateCity} />
        </section>
    )

}





