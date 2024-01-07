import React, { useEffect, useState } from "react";
import date from "date-and-time";
import day_of_week from "date-and-time/plugin/day-of-week";
import two_digit_year from "date-and-time/plugin/two-digit-year";

date.plugin(day_of_week);
date.plugin(two_digit_year);

function DateComponent({ timestamp }: { timestamp: Date }) {
  const [dateState, setDateState] = useState("");
  const now = new Date();
  const dateObj = new Date(timestamp);
  useEffect(() => {
    if (date.isSameDay(dateObj, now)) {
      setDateState("Today");
    } else if (date.isSameDay(dateObj, date.addDays(now, -1))) {
      setDateState("Yesterday");
    } else if (
      now.getDate() - dateObj.getDate() <= 6 &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear()
    ) {
      setDateState(date.format(dateObj, "dddd"));
    } else {
      setDateState(date.format(dateObj, "DD MMM YY"));
    }
  }, []);

  return <div className="text-center text-gray-600 text-sm">{dateState}</div>;
}

export default DateComponent;
