import "react-big-calendar/lib/css/react-big-calendar.css";
import { Fragment } from "react";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import AddEvent from "./AddEvent";

import events from "../events";
import { useActivityRate } from "@/hooks/use-activity-rate";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { getConsumptionRate } = useActivityRate();

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");

    getConsumptionRate(title);

    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  return (
    <div className="flex min-h-screen justify-between bg-white p-12">
      <Calendar
        views={["week"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={eventsData}
        style={{ height: "100vh", width: "100%", color: "black" }}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
        }}
        onSelectSlot={handleSelect}
      />
      {typeof selectedEvent !== "undefined" && selectedEvent && (
        <div className="ml-12">
          <AddEvent eventInfo={selectedEvent} />
        </div>
      )}
    </div>
  );
}
