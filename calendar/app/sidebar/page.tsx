// Sidebar.tsx
"use client";
import React from "react";
import CalendarMini from "../../components/calendar";

interface SidebarProps {
  onDateClick: (date: Date) => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Sidebar: React.FC<SidebarProps> = ({ onDateClick, setSelectedDate }) => {
  return (
    <div>
      <CalendarMini
        onDateClick={(date: Date) => {
          console.log("Clicked date:", date);
          onDateClick(date);
          setSelectedDate(date);
        }}
      />
    </div>
  );
};

export default Sidebar;
