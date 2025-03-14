// src/util/api/getAllEvents.ts

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  userId?: string;
}

const getAllEvents = async (): Promise<CalendarEvent[]> => {
  // Use an environment variable for the base URL or fallback to localhost.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/events`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  const events: CalendarEvent[] = await response.json();
  return events;
};

export default getAllEvents;