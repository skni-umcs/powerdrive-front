import React from "react";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../../../../../services/LanguageService";
import {
  calendars$,
  setCalendars,
} from "../../../../../../../../../../services/CalendarService";

const [useLanguage] = bind(language$);
const [useCalendars] = bind(calendars$);

const CalendarList = () => {
  const LANGUAGE = useLanguage();
  const calendars = useCalendars();

  const handleToggleCalendar = (calendarId: string) => {
    const calsCpy = [...calendars];
    const calendarIdx = calsCpy.findIndex(
      (calendar) => calendar.id === calendarId
    );
    calsCpy[calendarIdx].isActivated = !calsCpy[calendarIdx].isActivated;

    setCalendars(calsCpy);
  };

  return (
    <div className="app__sidebar__calendar__list">
      <div className="app__sidebar__calendar__list__header">
        {LANGUAGE.CALENDAR.YOUR_CALENDARS}
      </div>
      <div className="app__sidebar__calendar__list__items">
        {calendars.map((calendar) => (
          <div key={calendar.id} className="app__sidebar__calendar__list__item">
            <div
              className={
                calendar.isActivated
                  ? "app__sidebar__calendar__list__item__checkbox--checked"
                  : "app__sidebar__calendar__list__item__checkbox"
              }
              style={{
                borderColor: calendar.color,
                backgroundColor: calendar.isActivated ? calendar.color : "",
              }}
              onClick={() => handleToggleCalendar(calendar.id)}
            />
            <div className="app__sidebar__calendar__list__item__title">
              {calendar.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarList;
