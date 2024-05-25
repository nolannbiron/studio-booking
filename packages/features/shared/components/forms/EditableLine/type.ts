import type { ComboboxProps } from '@repo/ui/combobox'

export type TEditableLineCommon = { label?: string; icon?: JSX.Element }

export type TEditableLineTextComponent = TEditableLineCommon & {
	type: 'text'
	value?: string | null
	placeholder?: string
	onChange: (value: string) => void
	canReset?: boolean
	className?: string
	disabled?: boolean
	errors?: string | string[]
}

export type TEditableLineComboboxComponent<T> = TEditableLineCommon & {
	type: 'combobox'
} & ComboboxProps<T>

export type TEditableLineDateComponent = TEditableLineCommon & {
	type: 'date'
	value: string
	onChange: (value: string) => void
	className?: string
	disabled?: boolean
}

export type TEditableLineComponent<T = any> =
	| TEditableLineTextComponent
	| TEditableLineComboboxComponent<T>
	| TEditableLineDateComponent
// | {
// 		type: 'checkbox'
// 		value: boolean
// 		onChange: (value: boolean) => void
// 		className?: string
// 		disabled?: boolean
//   }
// | {
// 		type: 'number'
// 		value: number
// 		onChange: (value: number) => void
// 		className?: string
// 		disabled?: boolean
//   }
