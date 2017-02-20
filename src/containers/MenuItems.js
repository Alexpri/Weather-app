import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CityInfo from './CityInfo'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

class MenuItems extends Component {

    state = {
      slideIndex: 0
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        const { router } = this.context
        if (this.props.citiesInfoObj.size === 0) {
            router.replace('/')
        }
    }


    componentWillReceiveProps({active_id, loaded, citiesInfoObj}) {
        const { router } = this.context
        if (loaded && active_id) {
            router.replace(`/${active_id}`)
        } else if (citiesInfoObj.size === 0) {
            router.replace('/')
        }
    }


    render() {
        const { citiesInfoObj } = this.props
        
        if (citiesInfoObj.size === 0) return <h3>Please, input your City</h3>

        const cityMenuList = citiesInfoObj.map((item, index) => {
            return <Tab label={item.city.name} data-id={item.city.id} value={index} key={item.city.id} onActive={this.onActive}/>
        })

        const citySlidesList = citiesInfoObj.map((item) => {
            return <div key={item.city.id}><CityInfo cityInfoItem={item}/></div>
        })

        return(
            <div>
                <Tabs
                    initialSelectedIndex={this.handleActiveIndex()}
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
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

    onActive = (value) => {
        const { router } = this.context
        router.replace(`/${value.props["data-id"]}`)
    }

    handleActiveIndex = () =>{
        const activeIdIndex = this.props.citiesInfoObj.findIndex(item => {
            return item.city.id  === this.props.active_id;
        });
        
        return (activeIdIndex === -1 || activeIdIndex === 0) ? 0 : activeIdIndex
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value
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