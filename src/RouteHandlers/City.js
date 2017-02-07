import React, { Component } from 'react'
import CityInfo from '../containers/CityInfo'

class CityHandlers extends Component {

    render() {
        return <CityInfo id={this.props.params.id} />
    }
}

export default CityHandlers
