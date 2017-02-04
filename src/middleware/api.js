import { START, SUCCESS, FAIL } from '../constants'

export default store => next => action => {
	const { callAPI, type, ...rest } = action
	if (!callAPI) return next(action)

	next({
		type: type + START,
		...rest
	})

	setTimeout(function() {
		

	fetch(callAPI)
		.then(response => {
			response.json().then(function(payload) {
                console.log(payload)
				next({type: type + SUCCESS, payload, ...rest})
			});
		})
		.catch(error => next({type: type + FAIL, error, ...rest}))
	}, 1000);
}