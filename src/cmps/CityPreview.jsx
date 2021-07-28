import React from 'react'

export function CityPreview({ city, chooseCity }) {

    if (!city) return <div></div>
    return (
        <div className="city-preview flex a-center j-between ma" onClick={() => chooseCity(city)}>
            <p>{city.LocalizedName},  {city.Country.LocalizedName}</p>
        </div>
    )
}



