import { lstatSync, readdirSync } from 'fs'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'path'

const localesFolder = join(process.cwd(), '../../packages/i18n/messages')

i18next
	.use(Backend) // you can also use any other i18next backend, like i18next-http-backend or i18next-locize-backend
	.init({
		initImmediate: false, // setting initImediate to false, will load the resources synchronously
		fallbackLng: 'fr',
		lng: 'fr',
		supportedLngs: ['fr'],
		preload: readdirSync(localesFolder).filter((fileName) => {
			const joinedPath = join(localesFolder, fileName)
			return lstatSync(joinedPath).isDirectory()
		}),
		backend: {
			loadPath: join(localesFolder, '{{lng}}.json')
		}
	})

export default i18next
