import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CityInfo from './CityInfo'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

class MenuItems extends Component {

    state = {
      slideIndex: null
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillReceiveProps({active_id, loaded}) {
        const { router } = this.context
        if (loaded && active_id) router.replace(`/${active_id}`)
    }


    render() {
        const { citiesInfoObj, active_id } = this.props
        let activeIdIndex = {}
        const cityMenuList = citiesInfoObj.map((item, index) => {
            if (active_id === item.city.id) {
                activeIdIndex = {'index': index}
            }
            return <Tab label={item.city.name} value={index} key={item.city.id}/>
        })

        console.log(activeIdIndex)

        const citySlidesList = citiesInfoObj.map((item) => {
            return <div key={item.city.id}><CityInfo cityInfoItem={item}/></div>
        })

        
        return(
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    initialSelectedIndex={activeIdIndex.index}
                    >
                    {cityMenuList}
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    springConfig={{duration: '.5s',easeFunction: 'ease', delay: '0s'}}
                    >
                    {citySlidesList}
                </SwipeableViews>

            </div>
        )
    }

    handleChange = (value) => {
        const { router } = this.context
        const activeId = this.props.active_id
        router.replace(`/${activeId}`)
        this.setState({
            slideIndex: value,
        })
    }
}

export default connect((state, {id})=>{
    return {
        loading: state.cityInfo.get('loading'),
        loaded: state.cityInfo.get('loaded'),
        active_id: state.cityInfo.get('active_id'),
        citiesInfoObj: state.cityInfo.get('entities').valueSeq()
    }
}, null)(MenuItems)