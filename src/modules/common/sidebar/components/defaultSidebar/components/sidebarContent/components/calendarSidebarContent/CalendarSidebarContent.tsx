import React from "react";
import CalendarWidget from "./components/CalendarWidget";
import CalendarList from "./components/CalendarList";
import CalendarUpcomingEvents from "./components/CalendarUpcomingEvents";
import CalendarControls from "./components/CalendarControls";

const CalendarSidebarContent = () => {
  return (
    <div>
      <CalendarControls />
      <CalendarWidget />
      <CalendarList />
      <CalendarUpcomingEvents />
    </div>
  );
};

export default CalendarSidebarContent;
