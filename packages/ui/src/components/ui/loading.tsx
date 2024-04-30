'use client'

import { useTranslation } from '@repo/i18n/next/client'
import { type VariantProps, cva } from 'class-variance-authority'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { cn } from '../../lib/utils'

const loadingVariants = cva('animate-spin text-gray-400', {
	variants: {
		size: {
			default: 'h-5 w-5',
			xl: 'h-6 w-6'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

const textLoadingVariants = cva('', {
	variants: {
		size: {
			default: 'text-lg',
			xl: 'text-2xl'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

interface Props extends VariantProps<typeof loadingVariants> {
	withText?: boolean
	fullScreen?: boolean
}

export function Loading({ withText = false, size, fullScreen }: Props): JSX.Element {
	const { t } = useTranslation()

	return (
		<div className={cn(fullScreen && 'flex h-full w-full flex-1 items-center justify-center')}>
			<div className="flex flex-1 items-center justify-center gap-3">
				<AiOutlineLoading3Quarters className={loadingVariants({ size })} />

				{withText && <div className={textLoadingVariants({ size })}>{t('general.loading')}...</div>}
			</div>
		</div>
	)
}
