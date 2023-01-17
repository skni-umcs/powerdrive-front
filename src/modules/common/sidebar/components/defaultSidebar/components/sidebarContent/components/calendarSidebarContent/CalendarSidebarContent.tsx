import React from "react";
import CalendarWidget from "./components/CalendarWidget";
import CalendarList from "./components/CalendarList";
import CalendarUpcomingEvents from "./components/CalendarUpcomingEvents";

const CalendarSidebarContent = () => {
  return (
    <div>
      <CalendarWidget />
      <CalendarList />
      <CalendarUpcomingEvents />
    </div>
  );
};

export default CalendarSidebarContent;
