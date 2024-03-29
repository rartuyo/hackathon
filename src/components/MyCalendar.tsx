import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import EventInfo from "./EventInfo";

import AddEventModal from "@/components/AddEventModal";
import useSuggestedTime from "@/hooks/use-suggested-time";
import useSuggestedActivity from "@/hooks/use-suggested-activity";
import useCalculateAmount from "@/hooks/use-calculate-amount";

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

type TimeBlock = {
  start: Date;
  end: Date;
  amount?: number;
};

export default function MyCalendar() {
  const [eventsData, setEventsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState();
  const { calculate, amount } = useCalculateAmount();
  const [suggestedBlocks, setSuggestedBlocks] = useState();
  const [suggestedActivty, setSuggestedActivity] = useState();
  const { getSuggestions } = useSuggestedTime();
  const { getSuggestedActivity } = useSuggestedActivity();

  const bookHandler = (eventTitle: string) => {
    if (amount && eventInfo) {
      setEventsData([
        ...eventsData,
        {
          ...eventInfo,
          id: eventsData.length,
          title: eventTitle,
          amount: amount,
        },
      ]);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (amount) {
      setIsModalOpen(true);
    }
  }, [amount]);

  const handleSelect = async ({ start, end }: TimeBlock) => {
    setEventInfo({
      ...eventInfo,
      start,
      end,
    });

    await calculate(start, end);
  };

  const updateEventHandler = (newStartTime, newEndTime, newAmount) => {
    const today = format(new Date(selectedEvent.start), "yyyy-MM-dd");
    const toTodayStartTime = format(new Date(newStartTime), "HH:mm");
    const toTodayEndTime = format(new Date(newEndTime), "HH:mm");
    const newStart = new Date(`${today} ${toTodayStartTime}`);
    const newEnd = new Date(`${today} ${toTodayEndTime}`);

    setSelectedEvent({
      ...selectedEvent,
      start: newStart,
      end: newEnd,
      amount: newAmount,
    });

    const updatedItems = eventsData.map((event) => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
          amount: newAmount,
        };
      }

      return event;
    });

    setEventsData(updatedItems);
  };

  return (
    <div className="flex min-h-screen justify-between bg-white p-12">
      <AddEventModal
        isOpen={isModalOpen}
        price={amount}
        onBook={bookHandler}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
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
          setSuggestedBlocks(getSuggestions(event.start, event.end));
          setSuggestedActivity(getSuggestedActivity(event.title));
        }}
        onSelectSlot={handleSelect}
      />
      {typeof selectedEvent !== "undefined" && selectedEvent && (
        <div className="ml-12">
          <EventInfo
            eventInfo={selectedEvent}
            suggestedBlocks={suggestedBlocks}
            suggestedActivity={suggestedActivty}
            updateEventTime={updateEventHandler}
          />
        </div>
      )}
    </div>
  );
}
