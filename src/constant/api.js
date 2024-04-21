export const API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://backend:8000/api/'
		: 'API production'
