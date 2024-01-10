"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

export const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);
  const [activeButton, setActiveButton] = useState("today");
  const [currentView, setCurrentView] = useState<string>("month");

  const localizer = momentLocalizer(moment);

  const handleNavigate = (action: string) => {
    let prevDate: Date;

    switch (action) {
      case "PREV":
        prevDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // Subtract one day
        break;
      case "NEXT":
        prevDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
        break;
      case "TODAY":
      default:
        prevDate = new Date();
        break;
    }

    setCurrentDate(prevDate);
    setActiveButton(action.toLowerCase());
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const CustomToolbar = ({ label, onView }: any) => {
    return (
      <div className="rbc-toolbar bg-transparent">
        <button onClick={() => handleNavigate("TODAY")}>Today</button>
        <button onClick={() => handleNavigate("PREV")}>Prev</button>
        <button onClick={() => handleNavigate("NEXT")}>Next</button>
        <span className="rbc-toolbar-label bg-transparent">
          {moment(currentDate).format("MMMM DD, YYYY")}
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
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        view={currentView}
        events={events}
        eventWrapper={(props: any) => {
          // Customize the class names as needed
          const updatedClassName = `${props.className} custom-event-container`;

          return <div {...props} className={updatedClassName} />;
        }}
        style={{ height: "400px", backgroundColor: "transparent" }}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
