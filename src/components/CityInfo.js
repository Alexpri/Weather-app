import React from 'react'
import { weekDay } from './utils'

const CityInfo = (props) => {

    const { city, list } = props.info
    if (!city) return <h3>No City choose</h3>

    const listItem = list.map((data) => {
        const currDate = new Date(data.dt * 1000)
        const curWeekDay = weekDay(currDate.getDay())
        const avaraged = parseInt(data.temp.day, 10)
        const morn = parseInt(data.temp.morn, 10)
        const eve = parseInt(data.temp.eve, 10)
        const night = parseInt(data.temp.night, 10)

        return <li key={data.dt}><div className="date-temp">
                <h4>{curWeekDay}</h4>
                <div className="day-temp">
                    <div className="temp-avaraged">{avaraged}</div>
                    <div className="temp-morn">{morn}</div>
                    <div className="temp-eve">{eve}</div>
                    <div className="temp-night">{night}</div>
                </div>
            </div></li>
    })

    return(
        <div>
            <h3>{city.name}</h3>
            <ul className="date-list">
                {listItem}
            </ul>
        </div>
    )
}

export default CityInfo