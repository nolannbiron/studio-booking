import { cn } from '@repo/ui/lib/utils'
import { BubbleMenu as BubbleMenuBase, type Editor } from '@tiptap/react'
import { useState } from 'react'

import BubbleMenuDropdown from './BubbleMenuDropdown'
import BubbleMenuLink from './BubbleMenuLink'
import BubbleMenuToggleItem from './BubbleMenuToggleItem'

export default function BubbleMenu({ editor }: { editor: Editor; children?: React.ReactNode }): JSX.Element {
	const [openDropdown, setOpenDropdown] = useState(false)
	const [openLink, setOpenLink] = useState(false)

	return (
		<BubbleMenuBase
			editor={editor}
			shouldShow={({ editor: e, state }) => {
				if (e.isActive('link')) return false
				if (!state.selection.empty) return true
				return false
			}}
			tippyOptions={{
				duration: 200,
				moveTransition: 'transform 0.2s ease-in-out',
				maxWidth: 'auto',
				placement: 'top',
				hideOnClick: false,
				showOnCreate: true,
				onClickOutside(instance, e) {
					e.stopPropagation()
					if (instance.state.isVisible && openDropdown) {
						setOpenDropdown(false)
					}
				},
				onHide() {
					setOpenDropdown(false)
				}
			}}
			className={cn(
				'bg-popover text-popover-foreground animate-in fade-in-0 zoom-out-95 zoom-in-95 slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-input z-50 flex rounded-md border-y p-0 shadow-md outline-none'
			)}
		>
			<>
				<BubbleMenuDropdown editor={editor} onOpenChange={setOpenDropdown} open={openDropdown} />
				<BubbleMenuLink editor={editor} open={openLink} onOpenChange={setOpenLink} />
				<BubbleMenuToggleItem
					state={editor.isActive('bold') ? 'on' : 'off'}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					B
				</BubbleMenuToggleItem>
				<BubbleMenuToggleItem
					state={editor.isActive('italic') ? 'on' : 'off'}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					I
				</BubbleMenuToggleItem>
				<BubbleMenuToggleItem
					state={editor.isActive('underline') ? 'on' : 'off'}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				>
					<span className="underline">U</span>
				</BubbleMenuToggleItem>
				<BubbleMenuToggleItem
					className="rounded-r-md"
					state={editor.isActive('strike') ? 'on' : 'off'}
					onClick={() => editor.chain().focus().toggleStrike().run()}
				>
					<span className="line-through">S</span>
				</BubbleMenuToggleItem>
			</>
		</BubbleMenuBase>
	)
}
