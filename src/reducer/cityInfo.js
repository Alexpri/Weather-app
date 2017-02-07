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
    active_id: null,
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
                    .set('loaded', false)

        case LOAD_CITY_INFO + SUCCESS:
            return state
                    .set('loading', false)
                    .set('loaded', true)
                    .set('active_id', payload.city.id)
                    .setIn(['entities', payload.city.id], payload)

            
        default:
            return state
    }
}