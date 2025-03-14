"use client";

import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarViewProps {
  events: CalendarEvent[];
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

export default function CalendarView({ events }: CalendarViewProps) {
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
