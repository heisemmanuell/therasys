import { Event } from '@/types/calendar.d'
import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
      </div>
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-6 py-4">
          <h3 className="text-sm font-medium text-muted-foreground">You are going to</h3>
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <Avatar className="mt-1">
                <div className={`w-full h-full bg-[#ff9e58]`}/>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

