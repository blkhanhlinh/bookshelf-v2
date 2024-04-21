export const API_URL =
	process.env.NODE_ENV === 'development'
		? 'http://3.106.250.129:8000/api/'
		: 'API production'
