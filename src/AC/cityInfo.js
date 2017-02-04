import { LOAD_CITY_INFO } from '../constants'
import { services } from '../config/config'

export function cityInfo(city) {
    const url = services.openWeatherMap.url
    const apiKey = services.openWeatherMap.apiKey

    return {
        type: LOAD_CITY_INFO,
        callAPI: `${url}/data/2.5/forecast/daily?q=${city}&units=metric&us&mode=json&appid=${apiKey}`
    }
}