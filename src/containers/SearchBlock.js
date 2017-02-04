import React,{Component} from 'react'
import { connect } from 'react-redux'
import { cityInfo } from '../AC/cityInfo'
import CityInfo from '../components/CityInfo'
import Loader from '../components/Loader'

class SearchBlock extends Component {

    state = {
        City: ''
    }

    render() {
        const { cityInfoObj } = this.props
        const { City } = this.state


        console.log('--searchlock', (cityInfoObj.loading && !cityInfoObj.loaded));
        if (cityInfoObj.loading && !cityInfoObj.loaded) return <Loader />

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="City" onChange={this.handleChange} value={City} />
                    <button type="submit">Add City</button>
                </form>
                <CityInfo info={cityInfoObj} />
            </div>
        );
    }

    handleChange = ev => {
        this.setState({
            City: ev.target.value 
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.props.cityInfo(this.state.City)        
    }
}

export default connect((state) => {
    console.log(state.cityInfo)
    return {
        cityInfoObj: state.cityInfo
    }
}, { cityInfo })(SearchBlock)