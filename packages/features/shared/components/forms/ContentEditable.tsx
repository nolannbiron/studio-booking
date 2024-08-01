import type { HTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'

export default function ContentEditable({
	onChange,
	value,
	preventNewLine,
	...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'contentEditable' | 'suppressContentEditableWarning'> & {
	value: string
	onChange: (value: string | null) => void
	preventNewLine?: boolean
}) {
	const contentEditableRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!contentEditableRef.current) return
		if (contentEditableRef.current?.textContent !== value) {
			contentEditableRef.current.textContent = value
		}
	}, [value])

	useEffect(() => {
		setTimeout(() => {
			if (!contentEditableRef.current) return
			contentEditableRef.current?.focus()
			if (!contentEditableRef.current.textContent) return
			const range = document.createRange()
			const sel = window.getSelection()
			range.setStart(contentEditableRef.current, 1)
			range.collapse(true)
			sel?.removeAllRanges()
			sel?.addRange(range)
		}, 100)
	}, [])

	return (
		<div
			{...props}
			contentEditable
			autoFocus
			onKeyDown={(event) => {
				if (preventNewLine && event.key === 'Enter') {
					event.preventDefault()
				}

				props.onKeyDown?.(event)
			}}
			role="textbox"
			suppressContentEditableWarning
			ref={contentEditableRef}
			onInput={(event) => {
				onChange(event.currentTarget.textContent)
			}}
		/>
	)
}
