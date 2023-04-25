import React from "react";
import "../../styles/calendar.css";
import SecuredContainer from "../common/securedContainer/SecuredContainer";
import { bind } from "react-rxjs";
import { calendarViewMode$ } from "../../services/CalendarService";
import { CalendarViewModeEnum } from "../../enums/CalendarViewModeEnum";
import CalendarDayView from "./views/dayView/CalendarDayView";
import CalendarWeekView from "./views/weekView/CalendarWeekView";
import CalendarMonthView from "./views/monthView/CalendarMonthView";
import CalendarYearView from "./views/yearView/CalendarYearView";

const [useCalendarViewMode] = bind(calendarViewMode$);

const Calendar = () => {
  const calendarViewMode = useCalendarViewMode();

  return (
    <SecuredContainer>
      <div className="app__calendar__container">
        {calendarViewMode === CalendarViewModeEnum.DAY && <CalendarDayView />}
        {calendarViewMode === CalendarViewModeEnum.WEEK && <CalendarWeekView />}
        {calendarViewMode === CalendarViewModeEnum.MONTH && (
          <CalendarMonthView />
        )}
        {calendarViewMode === CalendarViewModeEnum.YEAR && <CalendarYearView />}
      </div>
    </SecuredContainer>
  );
};

export default Calendar;
