import type { TEditableLineComboboxComponent } from '@/components/forms/EditableLine/type'
import { Combobox } from '@repo/ui/combobox'

export default function EditableLineComboboxComponent<T>({
	children,
	...props
}: TEditableLineComboboxComponent<T>): JSX.Element {
	return (
		<Combobox {...props} asChild={false}>
			{children}
		</Combobox>
	)
}
