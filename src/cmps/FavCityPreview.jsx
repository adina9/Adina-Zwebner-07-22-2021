import React from 'react'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'

import { chooseCity } from '../store/actions/cityAction'

export const FavCityPreview = ({ favCity: { Day: { IconPhrase }, Temperature, city }, isCelsius }) => {

    const dispatch = useDispatch()

    const txtForDisplay = (Temperature) => {
        var currDegrees = new Date(Date.now()).getHours() > 8 ? Temperature.Maximum.Value : Temperature.Minimum.Value
        return isCelsius ? { degrees: (currDegrees - 30) / 2, sign: 'C' } : { degrees: currDegrees, sign: 'F' }
    }
    const { degrees, sign } = txtForDisplay(Temperature)

    if (!city) return <div>no city for display</div>

    return (

        <Link to="/"><div className="fav-preview flex col tac j-evenly" onClick={async () => await dispatch(chooseCity(city))}>
            <p>{city.LocalizedName}</p>
            <p>{degrees}° {sign}</p>
            <p>{IconPhrase}</p>
        </div>
        </Link>

    )
}
