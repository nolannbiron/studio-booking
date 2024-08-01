import EditableLineComboboxComponent from '@/components/forms/EditableLine/components/EditableLineComboboxComponent'
import EditableLineTextComponent from '@/components/forms/EditableLine/components/EditableLineTextComponent'
import type { TEditableLineComponent } from '@/components/forms/EditableLine/type'

// const isTextInput = (component: TEditableLineComponent): component is TEditableLineTextComponent => {
// 	return component.type === 'text' || component.type === 'textarea'
// }

const getComponent = (component: TEditableLineComponent): JSX.Element => {
	switch (component.type) {
		case 'text':
			return <EditableLineTextComponent {...component} />
		case 'combobox':
			return <EditableLineComboboxComponent {...component} />
		default:
			return <></>
	}
}

export default function EditableLineComponent(component: TEditableLineComponent): JSX.Element {
	return getComponent(component)
}
