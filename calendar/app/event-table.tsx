//event-table.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ModalComponent from "@/components/modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDisclosure } from "@nextui-org/modal";

interface MyCalendarProps {
  selectDate: Date | null;
}

const eventsData = [];

const useDayPropGetter = (selectDate: Date | null) => {
  const dayPropGetter = useCallback(
    (date: Date, resource?: any) => {
      if (selectDate && moment(date).isSame(selectDate, "day")) {
        return {
          style: {
            backgroundColor: "lightblue",
          },
        };
      }
      return {};
    },
    [selectDate]
  );

  return { dayPropGetter };
};

export const MyCalendar = ({ selectDate }: MyCalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<
    { start: Date; end: Date; title: string }[]
  >([]);

  const [activeButton, setActiveButton] = useState("today");
  const [currentView, setCurrentView] = useState<string>("month");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    if (selectDate) {
      setCurrentView("day");
      setCurrentDate(selectDate);
    }
  }, [selectDate]);

  const { dayPropGetter } = useDayPropGetter(selectDate);

  const handleNavigate = (action: string) => {
    let newDate: Date;

    switch (action) {
      case "PREV":
        newDate = selectDate
          ? new Date(selectDate.getTime() - 24 * 60 * 60 * 1000)
          : new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        // console.log(newDate);
        break;
      case "NEXT":
        newDate = moment(currentDate).add(1, "days").toDate();
        // console.log(newDate);
        break;
      case "TODAY":
      default:
        newDate = new Date();
        break;
    }

    setCurrentDate(newDate);
    console.log(currentDate);
    setActiveButton(action.toLowerCase());
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: any) => window.alert(event.title),
    []
  );

  const CustomToolbar = ({ label, onView }: any) => {
    return (
      <div className="rbc-toolbar bg-transparent">
        <button onClick={() => handleNavigate("TODAY")}>Today</button>
        <button onClick={() => handleNavigate("PREV")}>Prev</button>
        <button onClick={() => handleNavigate("NEXT")}>Next</button>
        <span className="rbc-toolbar-label bg-transparent">
          {/* {moment(currentDate).format("MMMM DD, YYYY")} */}

          {selectDate
            ? moment(selectDate).format("MMMM DD, YYYY")
            : moment(currentDate).format("MMMM DD, YYYY")}
        </span>

        <button
          className={currentView === "day" ? "active" : ""}
          onClick={() => handleViewChange("day")}
        >
          Day
        </button>
        <button
          className={currentView === "week" ? "active" : ""}
          onClick={() => handleViewChange("week")}
        >
          Week
        </button>
        <button
          className={currentView === "month" ? "active" : ""}
          onClick={() => handleViewChange("month")}
        >
          Month
        </button>
        <button
          className={currentView === "agenda" ? "active" : ""}
          onClick={() => handleViewChange("agenda")}
        >
          Agenda
        </button>
      </div>
    );
  };

  return (
    <div className="App bg-transparent">
      <Calendar
        date={currentDate}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        view={currentView}
        events={events}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        style={{ height: "400px", backgroundColor: "transparent" }}
        components={{
          toolbar: CustomToolbar,
        }}
        selectable={true}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};
