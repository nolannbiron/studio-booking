import { useAuthStore } from '@/state/auth.state'
import type { AxiosError } from 'axios'
import axios from 'axios'

const serverBaseUrl = `${import.meta.env.NEXT_PUBLIC_API_URL}/v1`
console.log(serverBaseUrl)

const instance = axios.create({
	baseURL: serverBaseUrl,
	withCredentials: false
})

instance.interceptors.request.use(
	(config) => {
		const accessToken = useAuthStore.getState().jwt?.token
		if (accessToken) {
			config.headers.set('Authorization', `Bearer ${accessToken}`)
			// config.headers.set('Content-Type', 'application/json')
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(response) => {
		return response
	},
	async (error: AxiosError) => {
		// const originalRequest = error.config
		// ? Should use home made _retry property to avoid infinite loop ?
		// if (error?.response?.status === 401 && originalRequest) {
		//     // ^ && !originalRequest._retry
		//     // originalRequest._retry = true

		//     const res = await axios.post(
		//         '/account/refresh-token',
		//         { refreshToken: getRefreshToken() },
		//         { baseURL: serverBaseUrl }
		//     )

		//     if (res.status === 200) {
		//         setTokens({ accessToken: res.data.user.token, refreshToken: res.data.user.refreshToken })

		//         axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.user.token}`

		//         return axios(originalRequest)
		//     }
		// }
		return Promise.reject(error)
	}
)

export { instance as axios }
