import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class MenuItems extends Component {

    render() {
        const { cityInfoObj } = this.props
        // if (!cityInfoObj.city) return null
        // const { name, id } = cityInfoObj.city
        const cityMenuList = cityInfoObj.map(item => <Link to={'/' + item.city.name} key={item.city.id}>{item.city.name}</Link>)

        
        return(
            <div>
                {cityMenuList}
            </div>
        )
    }
}

export default connect((state)=>{
    console.log(state.cityInfo.get('entities'));
    return {
        cityInfoObj: state.cityInfo.get('entities').valueSeq()
    }
}, null)(MenuItems)