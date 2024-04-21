import { render } from '@react-email/render'

import * as templates from './emails'

export async function renderEmail<K extends keyof typeof templates>(
	template: K,
	props: PartialOn<React.ComponentProps<(typeof templates)[K]>, 't'>
) {
	const Component = templates[template]

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return render(Component(props), {
		pretty: true
	})
}
