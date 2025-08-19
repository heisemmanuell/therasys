import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Event } from '@/types/calendar'
import { EventList } from '@/components/EventList'
// import DoctorCalendarView from '@/components/DoctorCalendarView'
import DoctorCalendarView from '@/components/DoctorCalendarViewModal'

const mockEvents = [
  {
    id: "1",
    title: "Sax",
    date: "2025-08-06",
    time: "15:27",
    location: "Clinic Room 2",
    description: "Routine checkup for sax",
  },
  {
    id: "2",
    title: "Jane Smith",
    date: "2025-08-10",
    time: "10:00",
    location: "Clinic Room 1",
    description: "Consultation with Jane",
  },
  {
    id: "3",
    title: "John Doe",
    date: "2025-08-15",
    time: "14:30",
    location: "Clinic Room 3",
    description: "Follow-up appointment",
  },
]

const ClientAppointments = () => {
  return (
    <div className="container max-w-[1350px] mx-auto p-6 space-y-6">
      <Card>
        <CardContent className='flex'>
          <div className="w-80 border-r bg-background">
            <EventList events={mockEvents} />
          </div>
          <div className="flex-1">
            <DoctorCalendarView events={mockEvents} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientAppointments