import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { weekDay } from './utils'
import { deleteCityInfo } from '../AC/cityInfo'
import RaisedButton from 'material-ui/RaisedButton';
import '../icons/owfont-master/css/owfont-regular.min.css'

class CityInfo extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    
    componentWillReceiveProps({cityInfoObj, citiesInfoObj}) {
        const { router } = this.context
        if (!cityInfoObj && citiesInfoObj.last()) {
            const id = citiesInfoObj.last().city.id
            router.replace(`/${id}`)
        } else if (!cityInfoObj) {
            router.replace(`/`)
        }
    }

    componentWillMount() {
        const { router } = this.context
        const { cityInfoObj } = this.props
        if (!cityInfoObj) router.replace(`/`)
    }


    render() {
        const { cityInfoItem } = this.props

        // if (loading && !loaded) return <Loader />
        if (!cityInfoItem) return <h3>No City choose</h3>
        const { city, list } = cityInfoItem

        const listItem = list.map((data) => {
            const currDate = new Date(data.dt * 1000)
            const curWeekDay = weekDay(currDate.getDay())
            const avaraged = parseInt(data.temp.day, 10)
            const avaragedIcon = data.weather[0].id
            const morn = parseInt(data.temp.morn, 10)
            const eve = parseInt(data.temp.eve, 10)
            const night = parseInt(data.temp.night, 10)

            return <li key={data.dt}><div className="date-temp">
                    <h4>{curWeekDay}</h4>
                    <div className="day-temp">
                        <span className={'owf owf-' + avaragedIcon}></span>
                        <div className="avaraged"></div><div className="temp-avaraged">{avaraged}</div>
                        <div className="morn"><div className="temp-morn">{morn}</div></div>
                        <div className="temp-eve">{eve}</div>
                        <div className="temp-night">{night}</div>
                    </div>
                </div></li>
        })

        return(
            <div>
                <h3 className="city-title">{city.name}</h3>
                <div className="remove-city" onClick={this.handleDelete}><RaisedButton label="REMOVE" secondary={true}/></div>
                <div className="date-list_wrap">
                    <ul className="date-list">
                        {listItem}
                    </ul>
                </div>
            </div>
        )
    }

    handleDelete = () => {
        const { cityInfoItem, deleteCityInfo } = this.props
        deleteCityInfo(cityInfoItem.city.id)
    }
}
export default connect((state, {id}) => {
    return {
        loading: state.cityInfo.get('loading'),
        loaded: state.cityInfo.get('loaded'),
        citiesInfoObj: state.cityInfo.get('entities').valueSeq()
    }
}, { deleteCityInfo })(CityInfo)