import React from "react";
import CalendarWidget from "./components/CalendarWidget";
import CalendarList from "./components/CalendarList";
import CalendarUpcomingEvents from "./components/CalendarUpcomingEvents";
import WeekViewModeSelector from "./components/WeekViewModeSelector";
import DateChanger from "./components/DateChanger";

const CalendarSidebarContent = () => {
  return (
    <div>
      <WeekViewModeSelector />
      <DateChanger />
      <CalendarWidget />
      <CalendarList />
      <CalendarUpcomingEvents />
    </div>
  );
};

export default CalendarSidebarContent;
