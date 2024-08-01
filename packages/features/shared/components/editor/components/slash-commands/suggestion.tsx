import type { Editor, Range } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import { type SuggestionProps } from '@tiptap/suggestion'
import { type RefAttributes } from 'react'
import tippy, { type GetReferenceClientRect, type Instance } from 'tippy.js'

import { commandsItems } from '../commands/commands-items'
import CommandItem, { type CommandItemProps } from './command-item'
import CommandsList from './commands-list'

type ItemCommandProps = {
	editor: Editor
	range: Range
}

export type TSuggestionCommandItem = {
	title: string
	Element: (props: CommandItemProps & { title: string }) => React.ReactNode
	command: (props: ItemCommandProps) => void
}

const suggestion = {
	items: ({ query }: { query: string }): TSuggestionCommandItem[] => {
		const items = Object.values(commandsItems)[0]
			.filter((item) => !item.title.includes('Text'))
			.map((item) => ({
				title: item.title,
				Element: (props) => (
					<CommandItem
						{...props}
						icon={item.icon}
						tooltipImage={item.tooltip.image}
						tooltip={item.tooltip.text}
					>
						{props.title}
					</CommandItem>
				),
				command: ({ editor, range }) => item.command({ editor, range, shouldDeleteRange: true })
			})) satisfies TSuggestionCommandItem[]

		return items.filter(({ title }) => title.toLowerCase().startsWith(query.toLowerCase()))
	},

	render: () => {
		let component: ReactRenderer<
			{ onKeyDown: (x: { event: { key: KeyboardEvent['key'] } }) => void },
			SuggestionProps & RefAttributes<unknown>
		>
		let popup: Instance[]

		return {
			onStart: (props: SuggestionProps) => {
				component = new ReactRenderer(CommandsList, {
					props,
					editor: props.editor as Editor
				}) as ReactRenderer<
					{ onKeyDown: (x: { event: { key: KeyboardEvent['key'] } }) => void },
					SuggestionProps & RefAttributes<unknown>
				>

				if (!props.clientRect) {
					return
				}

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

				if (!props.clientRect) {
					return
				}

				popup[0].setProps({
					getReferenceClientRect: props.clientRect as GetReferenceClientRect
				})
			},

			onKeyDown(props: { event: { key: KeyboardEvent['key'] } }) {
				if (props.event.key === 'Escape') {
					popup[0].hide()

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

export default suggestion
