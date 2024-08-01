export const setTokens = (tokenObj: { accessToken: string; refreshToken: string }) => {
	localStorage.setItem('access_token', tokenObj.accessToken)
	localStorage.setItem('refresh_token', tokenObj.refreshToken)
}

export const getAccessToken = () => {
	return localStorage.getItem('access_token')
}

export const getRefreshToken = () => {
	return localStorage.getItem('refresh_token')
}

export const clearTokens = () => {
	localStorage.removeItem('access_token')
	localStorage.removeItem('refresh_token')
}
