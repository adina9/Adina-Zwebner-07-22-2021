import React from 'react'
import { CityPreview } from './CityPreview'

export const CitiesList = ({ cities, chooseCity }) => {

    if (!cities || !cities.length) return <div></div>
    return (
        <div className="cities-list pa">
            {cities.map((city, idx) => {
                return <CityPreview city={city} key={idx} chooseCity={chooseCity} />
            })}
        </div>
    )
}


