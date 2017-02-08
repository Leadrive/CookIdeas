export default class Api {
	static headers() {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'dataType': 'json',
		}
	}

	static get(route) {
		return this.xhr(route, null, 'GET');
	}

	static put(route, params) {
		return this.xhr(route, params, 'PUT')
	}

	static post(route, params) {
		return this.xhr(route, params, 'POST')
	}

	static delete(route, params) {
		return this.xhr(route, params, 'DELETE')
	}

	static xhr(route, params, verb) {
		const host = 'http://www.recipepuppy.com'
		const url = `${host}${route}`
		const options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null )
		options.headers = Api.headers()
		return fetch(url, options).then( res => {
			if (res.ok) return res.json()
			return {results:[]}
		}).then( json => json.results )
	}
}
