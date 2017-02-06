import React,{Component} from 'react'
import { connect } from 'react-redux'
import { cityInfo } from '../AC/cityInfo'
// import CityInfo from '../components/CityInfo'
import CityInfo from './CityInfo'
import Loader from '../components/Loader'

class SearchBlock extends Component {

    state = {
        City: ''
    }

    render() {
        const { cityInfoObj, loading, loaded } = this.props
        const { City } = this.state

        if (loading && !loaded) return <Loader />
        const cityList = cityInfoObj.map(item => <article key={item.city.id}><CityInfo info={item} /></article>)


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="City" onChange={this.handleChange} value={City} />
                    <button type="submit">Add City</button>
                </form>
                <div>
                    {cityList}
                </div>
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
    return {
        loading: state.cityInfo.get('loading'),
        loaded: state.cityInfo.get('loaded'),
        cityInfoObj: state.cityInfo.get('entities').valueSeq()
    }
}, { cityInfo })(SearchBlock)