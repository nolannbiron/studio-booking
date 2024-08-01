import { type Editor } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import { type SuggestionProps } from '@tiptap/suggestion'
import type { RefAttributes } from 'react'
import tippy, { type GetReferenceClientRect, type Instance } from 'tippy.js'

import EmojiList from './emoji-list'

const suggestions = {
	items: ({ editor, query }: { editor: Editor; query: string }) => {
		return editor.storage.emoji.emojis
			.filter(({ shortcodes, tags }: { shortcodes: string[]; tags: string[] }) => {
				return (
					shortcodes.find((shortcode) => shortcode.startsWith(query.toLowerCase())) ||
					tags.find((tag) => tag.startsWith(query.toLowerCase()))
				)
			})
			.slice(0, 48)
	},

	allowSpaces: false,

	render: () => {
		let component: ReactRenderer<
			{ onKeyDown: (x: { event: { key: KeyboardEvent['key'] } }) => void },
			SuggestionProps & RefAttributes<unknown>
		>
		let popup: Instance[]

		return {
			onStart: (props: Partial<SuggestionProps>) => {
				const component = new ReactRenderer(EmojiList, {
					props,
					editor: props.editor as Editor
				})

				popup = tippy('body', {
					getReferenceClientRect: props.clientRect as GetReferenceClientRect,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start'
				})
			},

			onUpdate(props: SuggestionProps) {
				component.updateProps(props)

				popup[0].setProps({
					getReferenceClientRect: props.clientRect as GetReferenceClientRect
				})
			},

			onKeyDown(props: { event: { key: KeyboardEvent['key'] } }) {
				if (props.event.key === 'Escape') {
					popup[0].hide()
					component.destroy()

					return true
				}

				return component.ref?.onKeyDown(props)
			},

			onExit() {
				popup[0].destroy()
				component.destroy()
			}
		}
	}
}

export default suggestions
