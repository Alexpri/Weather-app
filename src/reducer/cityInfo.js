import { LOAD_CITY_INFO, START, SUCCESS } from '../constants'

const cityInfoInitialState = {
    loading: false,
    loaded: false
}

export default (state = cityInfoInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_CITY_INFO + START:
            return Object.assign({}, state, {loading: true})
        case LOAD_CITY_INFO + SUCCESS:
            console.log(payload);
            return Object.assign({}, state, {loading: false, loaded: true}, payload);
        default:
            return state
    }
}