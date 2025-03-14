import { CalendarView } from "@/components";
import { getAllEvents } from "@/util/api";
import { CalendarEvent } from "@/util/api/getAllEvents";

export default async function Home() {
  // Fetch events from the API on the server
  const events = await getAllEvents();

  // Convert the string dates to Date objects for CalendarView
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
