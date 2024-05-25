// import Emoji, { emojis } from '@tiptap-pro/extension-emoji'
import Commands from '@/components/editor/components/slash-commands/commands'
import type { JSONContent } from '@tiptap/core'
import { generateHTML } from '@tiptap/core'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import './editor.scss'

export const generateContentHTML = (bio: JSONContent) =>
	generateHTML(bio, [
		Underline.configure({
			HTMLAttributes: {
				class: 'underline'
			}
		}),
		Link.configure({
			validate: (href) => /^https?:\/\//.test(href),
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
		Commands.configure({
			// suggestion: suggestionSlash
		}),
		Placeholder.configure({
			showOnlyWhenEditable: false,
			showOnlyCurrent: false,
			includeChildren: true,
			placeholder: ({ node, hasAnchor }) => {
				if (node.type.name === 'heading') {
					return `Heading ${node.attrs.level}`
				}

				if (node.type.name === 'paragraph' && hasAnchor) {
					return 'Type / to open commands'
				}

				return ''
			}
		})
		// Emoji.configure({
		// 	emojis: emojis,
		// 	HTMLAttributes: { class: 'emoji' }
		// })
	])
