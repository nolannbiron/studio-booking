import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { cn } from '@repo/ui/lib/utils'
import { Resizable } from 're-resizable'
import { useState } from 'react'

const j: number[] = []

for (let i = NavbarSize.MD; i < NavbarSize.LG; i++) {
	j.push(i + 1)
}

const ResizeHandler = ({
	isResizing,
	onClick
}: {
	isResizing: boolean
	onClick?: () => void
}): JSX.Element => (
	<div
		onClick={onClick}
		className={`resize-handler z-50 ${isResizing ? 'resize-handler--is-resizing' : ''}`}
	/>
)

function ResizableSidebar({
	children,
	collapsable = true,
	enabled = true,
	hidden = false
}: {
	children?: React.ReactNode
	collapsable?: boolean
	hidden?: boolean
	enabled?: boolean
}): JSX.Element {
	const { width, setWidth } = useNavbarStore()

	const [isResizing, setIsResizing] = useState(false)

	const handleResize = (width: number) => {
		setWidth(width)
	}

	const snaps = {
		x: [...(collapsable ? [NavbarSize.SM] : []), NavbarSize.MD, ...j]
	}

	if (!enabled) return <>{children}</>

	return (
		<Resizable
			bounds="parent"
			minWidth={NavbarSize.SM}
			onResizeStart={() => {
				setIsResizing(true)
			}}
			size={{ width: hidden ? 0 : width, height: '100%' }}
			grid={[1, 1]}
			snap={snaps}
			maxWidth={NavbarSize.LG}
			onResizeStop={() => setIsResizing(false)}
			onResize={(_, __, ref) => {
				handleResize(ref.offsetWidth)
			}}
			boundsByDirection
			handleComponent={{
				right: <ResizeHandler isResizing={isResizing} />
			}}
			className="md:max-w-auto relative !z-10 flex h-screen overflow-hidden max-md:!min-w-0 max-md:!max-w-0"
			style={{ transition: !isResizing ? 'width 0.2s' : '', zIndex: 1, position: 'relative' }}
			handleStyles={{
				right: {
					right: 0,
					width: '2px',
					position: 'absolute'
				}
			}}
		>
			<nav
				className={cn(
					'bg-navbar navbar z-50 flex w-full flex-col justify-between transition-all will-change-auto max-md:bottom-10 max-md:top-10 max-md:!min-w-0 max-md:!max-w-0 md:relative md:h-screen md:border-r'
					// width === NavbarSize.SM &&
					// 	'fixed bottom-0 top-0 hover:!min-w-[280px] hover:!max-w-[280px]'
				)}
				style={{
					maxWidth: `${NavbarSize.LG}px`,
					minWidth: `${NavbarSize.SM}px`
				}}
			>
				{children}
			</nav>
		</Resizable>
	)
}

export default ResizableSidebar
