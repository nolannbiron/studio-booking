import gracefulShutdown from 'http-graceful-shutdown'

import app from './app'

const port = process.env.PORT ? Number(process.env.PORT) : 3004

app.listen({ port, host: '0.0.0.0' }, (err) => {
	if (err) {
		console.error(err)
	}

	console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
	console.log(`Server is listening on port ${port}`)
})

gracefulShutdown(app.server, {
	forceExit: true
})
