//calendarmini.tsx
"use client";
import React, { useCallback, useState } from "react";

import { Calendar } from "@natscale/react-calendar";

import "@natscale/react-calendar/dist/main.css";

interface CalendarMiniProp {
  onDateClick: (date: Date) => void;
}

const CalendarMini: React.FC<CalendarMiniProp> = ({ onDateClick }) => {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val: any) => {
      setValue(val);
      onDateClick(val);
    },
    [onDateClick]
  );

  return (
    <Calendar
      value={value}
      onChange={onChange}
      className="bg-transparent dark:"
    />
  );
};

export default CalendarMini;
