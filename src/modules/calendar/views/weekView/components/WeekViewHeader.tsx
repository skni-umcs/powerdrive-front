import React from "react";
import { visibleDays$ } from "../../../../../services/CalendarService";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../services/LanguageService";

const [useLanguage] = bind(language$);
const [useVisibleDays] = bind(visibleDays$);

const WeekViewHeader = () => {
  const LANGUAGE = useLanguage();
  const visibleDays = useVisibleDays();
  const today = new Date();

  return (
    <div className="app__calendar__week__header">
      {visibleDays.map((day, index) => (
        <div key={index} className="app__calendar__week__header__item">
          <div
            className={
              today.getFullYear() === day.getFullYear() &&
              today.getMonth() === day.getMonth() &&
              today.getDate() === day.getDate()
                ? "app__calendar__week__header__item__date--today"
                : "app__calendar__week__header__item__date"
            }
          >
            {day.getDate()}
          </div>
          <div className="app__calendar__week__header__item__day">
            {LANGUAGE.CALENDAR.DAYS_SHORT[day.getDay()]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekViewHeader;
