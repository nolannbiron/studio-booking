// // import EmojiPickerBase, { Theme } from 'emoji-picker-react'
// import { Popover, PopoverContent, PopoverTrigger, useThemeStorage } from '@acme/ui'
// import data from '@emoji-mart/data'
// import EmojiPickerBase from '@emoji-mart/react'
// import type { PropsWithChildren } from 'react'
// import { useState } from 'react'

// type Emoji = {
// 	emoticons: string[]
// 	id: string
// 	keywords: string[]
// 	name: string
// 	native: string
// 	shortcodes: string
// 	unified: string
// }
// interface EmojiPickerProps {
// 	onEmojiSelect: (emoji: Emoji) => void
// }

// export default function EmojiPicker({
// 	onEmojiSelect,
// 	children
// }: PropsWithChildren<EmojiPickerProps>): JSX.Element {
// 	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
// 	const { colorMode } = useThemeStorage()

// 	return (
// 		<Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
// 			<PopoverTrigger>{children}</PopoverTrigger>
// 			<PopoverContent className="w-full border-none bg-transparent p-0" side="top" align="end">
// 				<EmojiPickerBase
// 					data={data}
// 					locale="fr"
// 					navPosition="bottom"
// 					previewPosition="none"
// 					skinTonePosition="none"
// 					theme={colorMode === 'system' ? 'auto' : colorMode}
// 					onEmojiSelect={onEmojiSelect}
// 					autoFocus={false}
// 				/>
// 			</PopoverContent>
// 		</Popover>
// 	)
// }
