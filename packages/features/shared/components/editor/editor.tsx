import { editorExtensions } from '@/components/editor/editor-extensions'
import type { Content } from '@tiptap/react'
import { EditorContent, type JSONContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'

import BubbleMenu from './components/BubbleMenu'
import LinkBubbleMenu from './components/LinkBubbleMenu'
import './editor.scss'

export default function Editor({
	content,
	onChange,
	onBlur,
	placeholder,
	withCommands
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
		extensions: editorExtensions({ placeholder, withCommands })
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
