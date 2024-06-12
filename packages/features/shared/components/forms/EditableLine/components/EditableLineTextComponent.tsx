import type { TEditableLineTextComponent } from '@/components/forms/EditableLine/type'
import { useIsOutsideClick } from '@repo/hooks/lib/use-is-outside-click'
import { useTranslation } from '@repo/i18n/next/client'
import { Input } from '@repo/ui/input'
import { cn } from '@repo/ui/lib/utils'
import { useEffect, useRef, useState } from 'react'

export default function EditableLineTextComponent({
	value,
	onChange,
	// canReset,
	className,
	disabled,
	placeholder,
	label,
	errors
}: Omit<TEditableLineTextComponent, 'type'>): JSX.Element {
	const { t } = useTranslation()
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useIsOutsideClick(inputRef, () => setIsEditing(false))

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
	}, [isEditing])

	return (
		<>
			{!isEditing ? (
				<div
					onClick={() => setIsEditing(true)}
					className={cn(
						'hover:bg-muted flex min-h-8 w-full cursor-pointer items-center rounded-md border border-transparent px-1 text-sm',
						{
							'border-destructive': !!errors
						},
						className
					)}
				>
					{value ?? <span className="text-muted-foreground/70">{`Set ${label}`}</span>}
				</div>
			) : (
				<Input
					size="sm"
					ref={inputRef}
					className={cn(
						'px-1',
						{
							'focus-visible:!border-destructive': !!errors
						},
						className
					)}
					placeholder={placeholder ?? `Set ${label}`}
					disabled={disabled}
					onChange={(e) => onChange(e.currentTarget.value)}
					value={value ?? undefined}
				/>
			)}
			{!!errors && <span className="text-destructive text-xs">{t(`errors.${errors}` as any)}</span>}
		</>
	)
}
