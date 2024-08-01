import type { CalendarOptions } from '@fullcalendar/core/index.js'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGrid from '@fullcalendar/timegrid'
import { useTranslation } from '@repo/i18n/next/client'
import { useEffect } from 'react'

import './style.scss'

const events = [{ title: 'Meeting', start: new Date() }]

export default function Agenda({ ...props }: CalendarOptions) {
	const { i18n } = useTranslation()

	// load external events
	useEffect(() => {
		const draggableEl = document.getElementById('draggable-wrapper')

		if (!draggableEl) return

		new Draggable(draggableEl, {
			itemSelector: '.fc-event',
			eventData: function (eventEl) {
				const id = eventEl.dataset.id
				const title = eventEl.getAttribute('title')
				const color = eventEl.dataset.color
				const custom = eventEl.dataset.custom

				return {
					id: id,
					title: title,
					color: color,
					custom: custom,
					create: true
				}
			}
		})
	})

	return (
		<div id="draggable-wrapper" className="max-h-full flex-1">
			<FullCalendar
				{...props}
				height="100%"
				contentHeight="100%"
				nowIndicator
				locale={props.locale || i18n.language}
				plugins={[dayGridPlugin, timeGrid, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				fixedWeekCount
				headerToolbar={{
					left: 'dayGridMonth,timeGridWeek,timeGridDay',
					center: 'title',
					right: 'prev,next'
				}}
				eventContent={renderEventContent}

				// viewClassNames="h-full"
			/>
		</div>
	)
}

function renderEventContent(eventInfo: any) {
	return (
		<>
			<span>{eventInfo.timeText}</span>
			<span>{eventInfo.event.title}</span>
		</>
	)
}
