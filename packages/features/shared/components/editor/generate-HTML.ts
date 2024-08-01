// import Emoji, { emojis } from '@tiptap-pro/extension-emoji'
import { editorExtensions } from '@/components/editor/editor-extensions'
import type { JSONContent } from '@tiptap/core'
import { generateHTML } from '@tiptap/core'

import './editor.scss'

export const generateContentHTML = (bio: JSONContent) => generateHTML(bio, editorExtensions({}))
