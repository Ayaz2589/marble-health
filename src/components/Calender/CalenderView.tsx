"use client";

import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventModal } from "@/components";
import { createEvent } from "@/util/api";

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
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

export default function CalendarView({ events, onEventAdd }: CalendarViewProps) {
  const [localEvents, setLocalEvents] = useState<CalendarEvent[]>(events);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSlot(null);
  };

  const handleAddEvent = async (title: string) => {
    if (!selectedSlot) return;

    try {
      const newEventFromApi = await createEvent({
        userId: "4497b5c9-ba73-42d7-8f62-03ffebaef464",
        title,
        start: selectedSlot.start.toISOString(),
        end: selectedSlot.end.toISOString(),
      });
      
      const newEvent: CalendarEvent = {
        id: newEventFromApi.id,
        title: newEventFromApi.title,
        start: new Date(newEventFromApi.start),
        end: new Date(newEventFromApi.end),
      };

      setLocalEvents((prev) => [...prev, newEvent]);
      if (onEventAdd) onEventAdd(newEvent);
      handleCloseModal();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={localEvents}
        style={{ height: "98vh" }}
        defaultView="week"
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => console.log("Selected event:", event)}
      />
      <EventModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAddEvent={handleAddEvent}
        selectedSlot={selectedSlot}
      />
    </div>
  );
}
