//page.tsx
"use client";
import { useState } from "react";
import { MyCalendar } from "./event-table";
import Sidebar from "./sidebar/page";

interface sidebarProps {
  onDateClick: (date: Date) => void;
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <section className="flex ">
      <div className="w-1/5 md:w-1/3 overflow-hidden  ">
        <Sidebar
          onDateClick={handleDateClick}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="w-full">
        <MyCalendar selectDate={selectedDate} />
      </div>
    </section>
  );
}
