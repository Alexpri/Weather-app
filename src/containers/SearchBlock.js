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
        const { loading } = this.props
        const { City } = this.state

        if (loading) return <Loader />

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="City" onChange={this.handleChange} value={City} />
                    <button type="submit">Add City</button>
                </form>
                <CityInfo />
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

export default connect(null, { cityInfo })(SearchBlock)