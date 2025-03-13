"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
}

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Test Event",
      start: new Date(),
      end: new Date(Date.now() + 60 * 60 * 1000),
    },
  ]);

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: "80vh" }}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => console.log(event)}
        onSelectSlot={(slotInfo) => console.log(slotInfo)}
      />
    </div>
  );
}
