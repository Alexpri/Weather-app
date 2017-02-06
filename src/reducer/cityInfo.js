import { LOAD_CITY_INFO, DELETE_CITY_INFO, START, SUCCESS } from '../constants'
import { Map, Record } from 'immutable'
import { recordsFromArray} from './utils'

const City = new Record({
    cityInfo: {}
})

const defaultCities = recordsFromArray(City, [])

const defaultState = new Map({
    loading: false,
    loaded: false,
    entities: defaultCities
})

export default (state = defaultState, action) => {
    const { type, payload, cityId } = action

    switch (type) {
        case DELETE_CITY_INFO:
            return state.deleteIn(['entities', cityId])

        case LOAD_CITY_INFO + START:
            return state
                    .set('loading', true)

        case LOAD_CITY_INFO + SUCCESS:
            return state
                    .set('loading', false)
                    .set('loaded', true)
                    .setIn(['entities', payload.city.id], payload)

            // console.log(payload.city.id, state.toJS());
            
        default:
            return state
    }
}