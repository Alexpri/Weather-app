import { LOAD_CITY_INFO, START, SUCCESS } from '../constants'

const cityInfoInitialState = {}

export default (state = cityInfoInitialState, action) => {
    const { type, payload } = action

    switch (type) {
        case LOAD_CITY_INFO + START:
            return state
        case LOAD_CITY_INFO + SUCCESS:
            console.log();
            return Object.assign({}, state, payload);
        default:
            return state
    }
}