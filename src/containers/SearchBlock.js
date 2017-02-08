import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { cityInfo } from '../AC/cityInfo'
import Loader from '../components/Loader'

class SearchBlock extends Component {

    state = {
        City: ''
    }

    static contextTypes = {
        router: PropTypes.object
    }
    
    componentWillReceiveProps({active_id, loaded}) {
        const { router } = this.context
        if (loaded && active_id) router.replace(`/${active_id}`)
    }

    render() {
        const { loading, loaded } = this.props
        const { City } = this.state

        if (loading && !loaded) return <Loader />

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="City" onChange={this.handleChange} value={City} />
                    <button type="submit">Add City</button>
                </form>
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
        this.setState({
            City: '' 
        })       
    }
}

export default connect((state, {id}) => {
    return {
        loading: state.cityInfo.get('loading'),
        loaded: state.cityInfo.get('loaded'),
        active_id: state.cityInfo.get('active_id'),
        cityInfoObj: state.cityInfo.getIn(['entities', parseInt(id, 10)])
    }
}, { cityInfo })(SearchBlock)