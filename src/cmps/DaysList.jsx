import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { DayPreview } from './DayPreview'

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import moment from 'moment'

import img1 from '../assets/imgs/weatherIcons/1.png'
import img2 from '../assets/imgs/weatherIcons/2.png'
import img3 from '../assets/imgs/weatherIcons/3.png'
import img4 from '../assets/imgs/weatherIcons/4.png'
import img5 from '../assets/imgs/weatherIcons/5.png'
import img6 from '../assets/imgs/weatherIcons/6.png'
import img7 from '../assets/imgs/weatherIcons/7.png'
import img8 from '../assets/imgs/weatherIcons/8.png'
import img11 from '../assets/imgs/weatherIcons/11.png'
import img12 from '../assets/imgs/weatherIcons/12.png'
import img13 from '../assets/imgs/weatherIcons/13.png'
import img14 from '../assets/imgs/weatherIcons/14.png'
import img15 from '../assets/imgs/weatherIcons/15.png'
import img16 from '../assets/imgs/weatherIcons/16.png'
import img17 from '../assets/imgs/weatherIcons/17.png'
import img18 from '../assets/imgs/weatherIcons/18.png'
import img19 from '../assets/imgs/weatherIcons/19.png'
import img20 from '../assets/imgs/weatherIcons/20.png'
import img21 from '../assets/imgs/weatherIcons/21.png'
import img22 from '../assets/imgs/weatherIcons/22.png'
import img23 from '../assets/imgs/weatherIcons/23.png'
import img24 from '../assets/imgs/weatherIcons/24.png'
import img25 from '../assets/imgs/weatherIcons/25.png'
import img26 from '../assets/imgs/weatherIcons/26.png'
import img29 from '../assets/imgs/weatherIcons/29.png'
import img30 from '../assets/imgs/weatherIcons/30.png'
import img31 from '../assets/imgs/weatherIcons/31.png'
import img32 from '../assets/imgs/weatherIcons/32.png'
import img33 from '../assets/imgs/weatherIcons/33.png'
import img34 from '../assets/imgs/weatherIcons/34.png'
import img35 from '../assets/imgs/weatherIcons/35.png'
import img36 from '../assets/imgs/weatherIcons/36.png'
import img37 from '../assets/imgs/weatherIcons/37.png'
import img38 from '../assets/imgs/weatherIcons/38.png'
import img39 from '../assets/imgs/weatherIcons/39.png'
import img40 from '../assets/imgs/weatherIcons/40.png'
import img41 from '../assets/imgs/weatherIcons/41.png'
import img42 from '../assets/imgs/weatherIcons/42.png'
import img43 from '../assets/imgs/weatherIcons/43.png'
import img44 from '../assets/imgs/weatherIcons/44.png'


export const DaysList = ({ weatherDays, settings: { isCelsius }, favorites, updateCity }) => {


    const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44]

    const { currCity } = useSelector(state => state.cityModule)

    const [itemsForDisplay, setItemsForDisplay] = useState({})

    useEffect(() => {
        if (!weatherDays.length || !favorites || !favorites.length) console.log('oops');
        createTxt()
    }, [weatherDays, favorites, isCelsius])

    const createTxt = () => {
        if (weatherDays) {
            var today = weatherDays[0]
            if (today) {
                var { Day: { IconPhrase, Icon }, Temperature } = today
                var degrees = new Date(Date.now()).getHours() > 8 ? Temperature.Maximum.Value : Temperature.Minimum.Value
                var date = today.Date
                setItemsForDisplay({
                    txt: favorites?.find(fav => fav.Key === currCity.Key) ? 'remove from' : 'add to',
                    degrees: isCelsius ? (degrees - 30) / 2 : degrees,
                    sign: isCelsius ? 'C' : 'F',
                    date,
                    Icon,
                    IconPhrase
                })
            }
        }
    }

    var { txt, degrees, sign, date, Icon, IconPhrase } = itemsForDisplay

    return (
        <section className="days-list flex col pa ttc j-between">

            <div className="top flex j-between">

                <div className="first clean-list flex col">
                    <p><LocationOnIcon /> {currCity.LocalizedName}</p>
                    <p>{moment(date).format('LL')}</p>
                    <big className="flex"> {degrees > 0 ? <AddIcon /> : <RemoveIcon />} <p>{degrees}° {sign}</p></big>
                </div>

                <div className="middle flex col pa a-center">
                    <img src={imgs[Icon + 1]} alt="" />
                    <p>{IconPhrase}</p>
                </div>

                <div className="details">
                    <div className="favs flex a-center j-center" onClick={() => txt.length > 6 ? updateCity(false, { ...currCity }) : updateCity(true, { ...currCity })}>
                        <FavoriteIcon />
                        <p>{txt} favorites</p>
                    </div>
                </div>

            </div>

            <main className="days pa left-trans grid">
                {weatherDays.map((day, idx) => <DayPreview key={idx} day={day} imgs={imgs} isCelsius={isCelsius} />)}
            </main>
        </section>
    )
}
