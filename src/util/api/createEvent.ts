export interface NewEvent {
  userId: string;
  title: string;
  start: string; 
  end: string;   
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  userId?: string;
}

const createEvent = async (newEvent: NewEvent): Promise<CalendarEvent> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEvent),
  });

  if (!response.ok) {
    throw new Error(`Failed to create event: ${response.statusText}`);
  }

  const createdEvent: CalendarEvent = await response.json();
  return createdEvent;
};

export default createEvent;
