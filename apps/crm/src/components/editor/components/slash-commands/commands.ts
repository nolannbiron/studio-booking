import { Extension, type Range } from '@tiptap/core'
import type { Editor } from '@tiptap/react'
import Suggestion, { type SuggestionProps } from '@tiptap/suggestion'

const Commands = Extension.create({
	name: 'commands',

	addOptions() {
		return {
			name: 'slash-commands',
			suggestion: {
				char: '/',
				command: ({
					editor,
					range,
					props
				}: {
					editor: Editor
					range: Range
					props: SuggestionProps
				}) => {
					props.command({ editor, range })
				}
			}
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				...this.options.suggestion
			})
		]
	}
})

export default Commands
