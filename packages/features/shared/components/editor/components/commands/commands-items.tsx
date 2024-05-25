import i18next from '@repo/i18n/next/client'
import type { Editor, Range } from '@tiptap/core'

type ItemCommandProps = {
	editor: Editor
	range: Range
	shouldDeleteRange?: boolean
}

type CommandItems = {
	[key in string]: {
		title: string
		icon: string
		tooltip: {
			image: string
			text: string
		}
		command: (props: ItemCommandProps) => void
	}[]
}

export const commandsItems: CommandItems = {
	[`${i18next.t('editor.commands.basic_blocks.title')}`]: [
		{
			title: `${i18next.t('editor.commands.basic_blocks.paragraph')}`,
			icon: 'https://www.notion.so/images/blocks/text/en-US.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/text/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.paragraph_description')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).setParagraph().run()
				}

				editor.chain().focus().setParagraph().run()
			}
		},
		{
			title: `${i18next.t('editor.commands.basic_blocks.heading1')}`,
			icon: 'https://www.notion.so/images/blocks/header.57a7576a.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/header/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.heading1_description')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
				}

				editor.chain().focus().setHeading({ level: 1 }).run()
			}
		},
		{
			title: `${i18next.t('editor.commands.basic_blocks.heading2')}`,
			icon: 'https://www.notion.so/images/blocks/subheader.9aab4769.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/sub-header/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.heading2_description')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run()
				}

				editor.chain().focus().setHeading({ level: 2 }).run()
			}
		},
		{
			title: `${i18next.t('editor.commands.basic_blocks.heading3')}`,
			icon: 'https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/subsubheader/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.heading3_description')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run()
				}

				editor.chain().focus().setHeading({ level: 3 }).run()
			}
		},
		{
			title: `${i18next.t('editor.commands.basic_blocks.bullet_list')}`,
			icon: 'https://www.notion.so/images/blocks/bulleted-list.0e87e917.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/bulleted-list/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.bullet_list')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).toggleBulletList().run()
				}

				editor.chain().focus().toggleBulletList().run()
			}
		},
		{
			title: `${i18next.t('editor.commands.basic_blocks.ordered_list')}`,
			icon: 'https://www.notion.so/images/blocks/numbered-list.0406affe.png',
			tooltip: {
				image: 'https://www.notion.so/images/tooltips/blocks/numbered-list/en-US.png',
				text: `${i18next.t('editor.commands.basic_blocks.ordered_list_description')}`
			},
			command: ({ editor, range, shouldDeleteRange }: ItemCommandProps) => {
				if (shouldDeleteRange) {
					return editor.chain().focus().deleteRange(range).toggleOrderedList().run()
				}

				editor.chain().focus().toggleOrderedList().run()
			}
		}
	]
}
