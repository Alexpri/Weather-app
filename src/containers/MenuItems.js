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
        console.log(555);
    }


    componentWillReceiveProps({active_id, loaded}) {
        const { router } = this.context
        if (loaded && active_id) {
            // this.forceUpdate();
            console.log('replace', active_id)
            router.replace(`/${active_id}`)
        }
    }


    render() {
        const { citiesInfoObj } = this.props
        let activeIdIndex = {}
        const cityMenuList = citiesInfoObj.map((item, index) => {
            // if (active_id === item.city.id) {
            //     activeIdIndex = Object.assign({}, {'index': index})
            // }
            // console.log(444, index)
            return <Tab label={item.city.name} value={index} key={item.city.id}/>
        })

        const citySlidesList = citiesInfoObj.map((item) => {
            return <div key={item.city.id}><CityInfo cityInfoItem={item}/></div>
        })

        // console.log(this.handleActiveIndex());

        
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

    handleActiveIndex = () =>{
        let activeIdIndex = this.props.citiesInfoObj.findIndex(item => {
            return item.city.id  === this.props.active_id;
        });

        console.log('activeInden', this.state.slideIndex)

        return activeIdIndex ? activeIdIndex : this.state.slideIndex
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