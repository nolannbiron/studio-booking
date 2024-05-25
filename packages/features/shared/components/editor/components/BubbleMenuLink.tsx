import type { DropdownMenu } from '@repo/ui/dropdown-menu'
import { Input } from '@repo/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { type Editor } from '@tiptap/react'
import { type ComponentProps, type KeyboardEvent, Suspense, useState } from 'react'
import { FiGlobe, FiLink } from 'react-icons/fi'

interface Props extends ComponentProps<typeof DropdownMenu> {
	children?: React.ReactNode
	editor: Editor
}

const isValidUrl = (string: string) => {
	try {
		new URL(string)
	} catch (_) {
		return false
	}

	return true
}

export default function BubbleMenuLink({ editor, open, onOpenChange }: Props): JSX.Element {
	const [value, setValue] = useState(editor.isActive('link') ? editor.getAttributes('link').href : '')
	const [isError, setIsError] = useState(false)

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!isValidUrl(value)) {
			return setIsError(true)
		}

		if (e.key === 'Enter') {
			if (!editor.isActive('link') || value !== editor.getAttributes('link').href) {
				editor.chain().focus().setLink({ href: value }).run()
			} else {
				editor.chain().focus().unsetLink().run()
			}
			onOpenChange?.(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
		isError && setIsError(false)
	}

	const handleApply = () => {
		editor.chain().focus().setLink({ href: value }).run()
		setValue('')
		onOpenChange?.(false)
	}

	return (
		<Popover open={open} onOpenChange={onOpenChange}>
			<PopoverTrigger className="hover:bg-accent border-input focus:ring-ring flex w-fit items-center justify-start rounded-none border-r px-3 text-sm shadow-none focus:outline-0 focus:ring-1">
				<div className="flex w-full items-center justify-start gap-2">
					<Suspense fallback={<div />}>
						<FiLink />
					</Suspense>
					<span>Link</span>
				</div>
			</PopoverTrigger>
			<PopoverContent
				hideWhenDetached
				onInteractOutside={() => {
					onOpenChange?.(false)
				}}
				side="bottom"
				align="start"
				className="w-64 p-1"
			>
				<Input
					variant={isError ? 'error' : 'default'}
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					size="xs"
					placeholder="Paste or type a link"
					className="w-full"
				/>
				{!!value && (
					<div
						onClick={handleApply}
						className="bg-accent mt-2 flex max-w-full cursor-pointer items-start justify-start gap-2 rounded-md p-1"
					>
						<div className="relative h-4 w-4">
							<Suspense fallback={<div />}>
								<FiGlobe />
							</Suspense>
						</div>
						<div className="grid">
							<div className="truncate text-xs font-medium">{value}</div>
							<div className="text-foreground/50 text-[10px]">
								{!isValidUrl(value) ? 'Type a complete URL to link' : 'Link to web page'}
							</div>
						</div>
					</div>
				)}
			</PopoverContent>
		</Popover>
	)
}
