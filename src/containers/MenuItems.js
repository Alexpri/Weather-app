import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class MenuItems extends Component {

    render() {
        const { citiesInfoObj } = this.props
        const cityMenuList = citiesInfoObj.map(item => <Link to={`/${item.city.id}`} key={item.city.id}>{item.city.name}</Link>)

        
        return(
            <div>
                {cityMenuList}
            </div>
        )
    }
}

export default connect((state, {id})=>{
    return {
        loading: state.cityInfo.get('loading'),
        loaded: state.cityInfo.get('loaded'),
        citiesInfoObj: state.cityInfo.get('entities').valueSeq()
    }
}, null)(MenuItems)