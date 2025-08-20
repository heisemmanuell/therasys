"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Event } from '@/types/calendar'
import { EventList } from '@/components/EventList'
import CalendarView from '@/components/CalendarView'

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Client Meeting',
    date: '2024-11-04',
    time: '07:15 AM',
    location: '96 Davion Mission Suite 157',
    type: 'client-meeting',
    address: '96 Davion Mission Suite 157',
    age: '30',
    sex: 'male'
  },
  {
    id: '2',
    title: 'Weekend Festival',
    date: '2024-11-23',
    time: '01:00 PM',
    location: '823 Monte Flats Suite 158',
    type: 'festival',
    address: '96 Davion Mission Suite 157',
    age: '30',
    sex: 'male'
  }
]

const ClientAppointments = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents)

  const handleAddEvent = (newEvent: Event) => {
    setEvents((prev) => [...prev, newEvent])
  }

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents((prev) => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev))
  }

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter(ev => ev.id !== id))
  }

  return (
    <div className="container max-w-[1350px] mx-auto p-6 space-y-6">
      <Card>
        <CardContent className='flex'>
          {/* Sidebar */}
          <div className="w-80 border-r bg-background">
            <EventList events={events} />
          </div>

          {/* Calendar */}
          <div className="flex-1">
            <CalendarView 
              events={events}
              onAddEvent={handleAddEvent}
              onUpdateEvent={handleUpdateEvent} 
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientAppointments