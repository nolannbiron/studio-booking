import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const Tabs = TabsPrimitive.Root

const tabsListClasses = cva('relative inline-flex items-center', {
	variants: {
		variant: {
			default: 'text-muted-foreground bg-muted w-full justify-center gap-2 rounded-md p-1',
			outline: 'gap-1',
			primary:
				'text-muted-foreground justify-center rounded-full border border-gray-200 bg-gray-100 p-0.5',
			bordered:
				'bg-background text-foreground after:bg-input w-full p-0 pb-2.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:z-0 after:h-px after:w-full'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListClasses>
>(({ className, variant, ...props }, ref) => (
	<TabsPrimitive.List ref={ref} className={cn(tabsListClasses({ variant }), className)} {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerClasses = cva(
	'focus-visible:ring-ring relative flex items-center gap-2 px-2 py-1 text-sm focus:outline-0 focus-visible:ring-1 data-[state=active]:font-medium',
	{
		variants: {
			variant: {
				default:
					'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex w-full items-center justify-center whitespace-nowrap rounded border border-transparent text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow',
				outline:
					'data-[state=active]:border-input data-[state=active]:bg-muted/50 data-[state=inactive]:hover:bg-muted/50 data-[state=active]:text-foreground border-input rounded-md border opacity-70 data-[state=active]:opacity-100 data-[state=active]:shadow-sm',
				primary:
					'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 data-[state=active]:shadow-sm',
				bordered:
					'data-[state=inactive]:hover:border-input/80 text-secondary-foreground data-[state=active]:border-input after:bg-input data-[state=active]:before:bg-foreground w-fit rounded-md border border-transparent opacity-70 before:absolute before:-bottom-[11px] before:left-0 before:z-10 before:h-px before:w-full before:rounded-full before:opacity-0 after:absolute after:-bottom-[11px] after:left-0 after:right-0 after:z-0 after:h-px after:w-full hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:opacity-70 data-[state=active]:opacity-100 data-[state=active]:before:opacity-100 data-[state=inactive]:hover:border'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerClasses>
>(({ className, variant, ...props }, ref) => (
	<TabsPrimitive.Trigger ref={ref} className={cn(tabsTriggerClasses({ variant }), className)} {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const tabsContentClasses = cva('', {
	variants: {
		variant: {
			default:
				'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})
const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & VariantProps<typeof tabsContentClasses>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content ref={ref} className={cn(tabsContentClasses({}), className)} {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
