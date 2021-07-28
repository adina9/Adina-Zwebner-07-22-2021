import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { ToggleWrapper } from './ToggleWrapper'
import { updateDarkMode, updateCelsius } from '../store/actions/settingsAction'

export const AppHeader = () => {

    const [darkMode, setIsDarkMode] = useState(false)
    const [celsius, setIsCelsius] = useState(false)

    const { settings: { isDarkMode, isCelsius } } = useSelector(state => state.settingsModule)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsDarkMode(isDarkMode)
        setIsCelsius(isCelsius)
    }, [])

    const onUpdate = (key, value) => {
        switch (key) {
            case 'mode':
                setIsDarkMode(value)
                dispatch(updateDarkMode(value))
                break
            case 'temp':
                setIsCelsius(value)
                dispatch(updateCelsius(value))
                break
            default:
                break
        }
    }
    return (
        <header className={`app-header ${darkMode ? 'dark' : ''} flex a-center pa`}>
            <div className="inner-div flex j-between main-layout a-center">
                <div className="logo">
                    <p>Herolo Weather Task</p>
                </div>

                <nav>
                    <ul className="flex nav-links clean-list">
                        <li><NavLink activeClassName="active-link" exact to="/">Home</NavLink></li>
                        <li><NavLink activeClassName="active-link" to="/favorites">Favorites</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className="toggles pa">

                <ToggleWrapper obj={{ value: darkMode, key: 'mode' }} idx={0} onUpdate={onUpdate} />
                <ToggleWrapper obj={{ value: celsius, key: 'temp' }} idx={1} onUpdate={onUpdate} />
            </div>
        </header>
    )
}


