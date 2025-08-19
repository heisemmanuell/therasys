'use client'

import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Event } from '@/types/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import "./styles.css"

type Props = {
  events: Event[]
  onAddEvent: (event: Event) => void
  onUpdateEvent: (event: Event) => void
  onDeleteEvent: (id: string) => void
}

const CalendarView = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }: Props) => {
  const [openForm, setOpenForm] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [form, setForm] = useState({
    id: "",
    clientName: "",
    sex: "male",
    age: "",
    date: "",
    time: "",
  })

  //  When clicking on a date
  const handleDateClick = (info: any) => {
    setForm({ id: "", clientName: "", sex: "male", age: "", date: info.dateStr, time: "" })
    setOpenForm(true)
  }

  // When clicking on an existing event
  const handleEventClick = (info: any) => {
    const found = events.find(ev => ev.id === info.event.id)
    if (found) {
      setSelectedEvent(found)
      setOpenDetails(true)
    }
  }

  // Submit for Add / Edit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent: Event = {
      id: form.id || String(Date.now()),
      title: form.clientName,
      date: form.date,
      time: form.time,
      location: "Not specified",
      type: "appointment",
      sex: form.sex,
      age: form.age
    }

    if (form.id) {
      onUpdateEvent(newEvent)
    } else {
      onAddEvent(newEvent)
    }

    setOpenForm(false)
  }

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id)
      setOpenDetails(false)
    }
  }

  const handleEdit = () => {
    if (selectedEvent) {
      setForm({
        id: selectedEvent.id,
        clientName: selectedEvent.title,
        sex: selectedEvent.sex || "male",
        age: selectedEvent.age || "",
        date: selectedEvent.date,
        time: selectedEvent.time,
      })
      setOpenDetails(false)
      setOpenForm(true)
    }
  }

  return (
    <div className='w-full h-full p-4'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />

      {/* Add / Edit Form */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Appointment" : "New Appointment"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Client Name</Label>
              <Input 
                value={form.clientName} 
                onChange={(e) => setForm({ ...form, clientName: e.target.value })} 
                required 
              />
            </div>

            <div>
              <Label>Sex</Label>
              <Select 
                value={form.sex} 
                onValueChange={(val) => setForm({ ...form, sex: val })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white shadow-md border rounded-md">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Age</Label>
              <Input 
                type="number" 
                value={form.age} 
                onChange={(e) => setForm({ ...form, age: e.target.value })} 
                required 
              />
            </div>

            <div>
              <Label>Date</Label>
              <Input 
                type="date" 
                value={form.date} 
                onChange={(e) => setForm({ ...form, date: e.target.value })} 
                required 
              />
            </div>

            <div>
              <Label>Time</Label>
              <Input 
                type="time" 
                value={form.time} 
                onChange={(e) => setForm({ ...form, time: e.target.value })} 
                required 
              />
            </div>

            {/* <div>
              <Label>Location</Label>
              <Input 
                type="time" 
                value={form.time} 
                onChange={(e) => setForm({ ...form, time: e.target.value })} 
                required 
              />
            </div> */}

            <Button type="submit" className="w-full">
              {form.id ? "Update Appointment" : "Add Appointment"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Details View */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-2">
              <p><b>Client:</b> {selectedEvent.title}</p>
              <p><b>Sex:</b> {selectedEvent.sex}</p>
              <p><b>Age:</b> {selectedEvent.age}</p>
              <p><b>Date:</b> {selectedEvent.date}</p>
              <p><b>Time:</b> {selectedEvent.time}</p>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleEdit}>Edit</Button>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
const renderEventContent = (eventInfo: any) => {
  return (
    <div className="text-black">
      <strong>{eventInfo.event.title}</strong>
      <div>{eventInfo.event.extendedProps.time}</div>
    </div>
  )
}

export default CalendarView
