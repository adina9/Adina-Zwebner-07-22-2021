import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { CitiesList } from './CitiesList';
import { loadCities } from '../store/actions/cityAction';

import SearchIcon from '@material-ui/icons/Search';

export const CityFilter = ({ onUpdateInputChange, chooseCity, cities, isCityClicked, isDarkMode }) => {

    const [searchBy, setSearchBy] = useState('')
    const dispatch = useDispatch()

    const inputRef = useRef(null)
    useEffect(() => inputRef.current.focus(), [])

    const handleChange = ev => {
        let search = ev.target.value
        setSearchBy(search)
        if (search) getCities(search)
        onUpdateInputChange()
    }

    const getCities = async q => await dispatch(loadCities(q))

    const onChooseCity = async (city) => {
        await chooseCity(city)
        setSearchBy('')
    }

    return (

        <section className={`filter ${isDarkMode ? 'dark' : ''} pa`}>
            <form>
                <input ref={inputRef} type="text" value={searchBy} name="name" placeholder="Search..." onChange={handleChange} autoComplete="off" />
                <span className="search-icon"><SearchIcon /></span>
            </form>
            {(!isCityClicked && searchBy?.length) && <CitiesList cities={cities} chooseCity={onChooseCity} />}
        </section>

    )
}
