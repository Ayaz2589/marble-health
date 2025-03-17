import { CalendarView } from "@/components";
import { getAllEvents } from "@/util/api";
import { CalendarEvent } from "@/util/api/getAllEvents";

export default async function Home() {
  const events = await getAllEvents();

  const parsedEvents = events.map((event: CalendarEvent) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div>
      <CalendarView events={parsedEvents} />
    </div>
  );
}
