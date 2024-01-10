"use client";
import React, { useCallback, useState } from "react";

import { Calendar } from "@natscale/react-calendar";

import "@natscale/react-calendar/dist/main.css";

const CalendarMini = () => {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val: any) => {
      setValue(val);
    },
    [setValue]
  );

  return (
    <Calendar value={value} onChange={onChange} className="bg-transparent" />
  );
};

export default CalendarMini;
