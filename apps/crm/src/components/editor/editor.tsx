// import Emoji, { emojis } from '@tiptap-pro/extension-emoji'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import type { Content } from '@tiptap/react'
import { EditorContent, type JSONContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect } from 'react'

import BubbleMenu from './components/BubbleMenu'
import LinkBubbleMenu from './components/LinkBubbleMenu'
import Commands from './components/slash-commands/commands'
import suggestionSlash from './components/slash-commands/suggestion'
import './editor.scss'

export default function Editor({
	content,
	onChange,
	onBlur,
	withCommands = true,
	placeholder
}: {
	content?: Content
	withCommands?: boolean
	onChange?: (content?: JSONContent) => void
	onBlur?: () => void
	placeholder?: string
}) {
	const editor = useEditor({
		content: content,
		onBlur: ({ editor }) => {
			onChange?.(editor.getJSON())
			onBlur?.()
		},
		onUpdate: ({ editor }) => {
			onChange?.(editor.getJSON())
		},
		// onCreate: ({ editor }) => {
		// 	editor.commands.focus(editor.state.doc.content.size)
		// },
		extensions: [
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
						return `Heading ${node.attrs.level}`
					}

					//if document is empty
					if (editor.state.doc.content.size === 2) {
						return placeholder ?? 'Commencer à taper...'
					}

					if (node.type.name === 'paragraph' && hasAnchor) {
						if (withCommands) return 'Taper / pour afficher les commandes'
						return 'Commencer à taper...'
					}

					return ''
				}
			})
			// Emoji.configure({
			// 	emojis: emojis,
			// 	HTMLAttributes: { class: 'emoji' },
			// 	suggestion: suggestionEmojis as Omit<SuggestionOptions, 'editor'>
			// })
		]
	})

	useEffect(() => {
		if (!editor) return

		editor.isFocused && editor.commands.focus()
	}, [content, editor])

	return (
		<>
			{editor && <BubbleMenu editor={editor} />}
			{editor && <LinkBubbleMenu editor={editor} />}
			<EditorContent
				className="placeholder:text-muted-foreground/50 text-foreground flex h-full w-full text-sm font-normal focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				editor={editor}
			/>
		</>
	)
}
