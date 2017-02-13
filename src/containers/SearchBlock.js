import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { cityInfo } from '../AC/cityInfo'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Loader from '../components/Loader'
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';

injectTapEventPlugin();

const styleButton = {
    verticalAlign: 'middle',
};

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

        const loader = loading ? !loaded ?
                                 <Loader />
                                 : null
                                 : null

        return (
            <div>
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <TextField hintText="City" name="City" onChange={this.handleChange} value={City}  />
                    <FloatingActionButton mini={true} style={styleButton} type="submit">
                        <ContentAdd />
                    </FloatingActionButton>
                    {loader}
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