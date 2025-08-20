import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Event } from '@/types/calendar'
import { DoctorEventList } from '@/components/DoctorEventList'
// import DoctorCalendarView from '@/components/DoctorCalendarView'
import DoctorCalendarView from '@/components/DoctorCalendarViewModal'

const mockEvents = [
  {
    id: "1",
    clientName: "John",
    sex: "male",
    date: "2025-08-06",
    time: "15:27",
    address: "Buea, Cameroon",
  },
  {
    id: "2",
    clientName: "Doe",
    sex: "male",
    date: "2025-08-20",
    time: "15:27",
    address: "Yaounde, Cameroon",
  },
  {
    id: "3",
    clientName: "Joseph",
    sex: "female",
    date: "2025-08-30",
    time: "19:27",
    address: "Abuja, Nigeria",
  },
  // {
  //   id: "3", 
  //   title: "John Doe",
  //   date: "2025-08-15",
  //   time: "14:30",
  //   location: "Clinic Room 3",
  //   description: "Follow-up appointment",
  // },
]

const ClientAppointments = () => {
  return (
    <div className="container max-w-[1350px] mx-auto p-6 space-y-6">
      <Card>
        <CardContent className='flex'>
          <div className="w-80 border-r bg-background">
            <DoctorEventList events={mockEvents} />
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