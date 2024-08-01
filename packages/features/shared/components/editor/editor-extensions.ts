import Commands from '@/components/editor/components/slash-commands/commands'
import i18n from '@repo/i18n/next/client'
import type { Extensions } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import suggestionSlash from './components/slash-commands/suggestion'

export const editorExtensions = ({ withCommands = true, placeholder = '' }): Extensions => [
	Underline.configure({
		HTMLAttributes: {
			class: 'underline'
		}
	}),
	Link.configure({
		// validate: (href) => /^https?:\/\//.test(href),
		linkOnPaste: true,
		autolink: true,
		protocols: ['http', 'https'],
		openOnClick: false,
		HTMLAttributes: {
			// Change rel to different value
			// Allow search engines to follow links(remove nofollow)
			rel: 'noopener noreferrer',
			// Remove target entirely so links open in current tab
			target: null
		}
	}),
	StarterKit.extend({
		paragraph: {
			draggrable: true
		},
		heading: {
			draggrable: true
		},
		dropcursor: {
			class: 'drop-cursor bg-accent'
		},
		strike: {
			HTMLAttributes: {
				class: 'line-through'
			}
		}
	}).configure({
		heading: {
			levels: [1, 2, 3]
		}
	}),
	...(withCommands
		? [
				Commands.configure({
					suggestion: suggestionSlash
				})
			]
		: []),
	Placeholder.configure({
		showOnlyWhenEditable: true,
		showOnlyCurrent: true,
		includeChildren: true,
		placeholder: ({ node, hasAnchor, editor }) => {
			if (node.type.name === 'heading') {
				return `${i18n.t('editor.commands.basic_blocks.heading')} ${node.attrs.level}`
			}

			//if document is empty
			if (editor.state.doc.content.size === 2) {
				return placeholder ?? i18n.t('editor.placeholder.startTyping')
			}

			if (node.type.name === 'paragraph' && hasAnchor) {
				if (withCommands) return i18n.t('editor.placeholder.press')
				return i18n.t('editor.placeholder.startTyping')
			}

			return ''
		}
	}),
	TaskList,
	TaskItem.configure({
		nested: true,
		HTMLAttributes: {
			class: 'editor-task-item [&input[type=checkbox]]:peer'
		}
	})
]
