import React from 'react'
import moment from 'moment'


export const DayPreview = ({ isCelsius, day, imgs}) => {

    const getTxtForDisplay = (avg) => isCelsius ? { degrees: (avg - 30) / 2, sign: 'C' } : { degrees: avg, sign: 'F' }

    const week = ['sun', 'mon', 'tues', 'wednes', 'thurs', 'fri', 'satur']

    const { Temperature: { Minimum: { Value }, Maximum }, Day: { IconPhrase, Icon } } = day
    const date = day.Date
    const currDegrees = new Date(Date.now()).getHours() > 8 ? Maximum.Value : Value
    const { degrees, sign } = getTxtForDisplay(currDegrees)

    return (
        <section className="day-preview">
            <div className="img">
                <img src={imgs[Icon + 1]} alt="" />
            </div>
            <div className="details flex col ma a-center j-center">
                <b>{`${week[new Date(date).getDay()]}day`}</b>
                <span className="date"><b>{moment(date).utc().format('MM/DD/YYYY')}</b></span>
                <span className="icon-phrase">{IconPhrase}</span>
                <span className="temperature">{degrees}° {sign}</span>
            </div>
        </section>
    )
}
