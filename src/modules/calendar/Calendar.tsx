import React from "react";
import "../../styles/calendar.css";
import SecuredContainer from "../common/securedContainer/SecuredContainer";
import CalendarWeekView from "./views/weekView/CalendarWeekView";

const Calendar = () => {
  return (
    <SecuredContainer>
      <div className="app__calendar__container">
        <CalendarWeekView />
      </div>
    </SecuredContainer>
  );
};

export default Calendar;
