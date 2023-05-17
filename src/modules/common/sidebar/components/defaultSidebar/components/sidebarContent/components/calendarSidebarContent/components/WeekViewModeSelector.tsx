import React from "react";
import { bind } from "react-rxjs";
import {
  calendarWeekViewMode$,
  setCalendarWeekViewMode,
} from "../../../../../../../../../../services/CalendarService";
import { CalendarWeekViewModeEnum } from "../../../../../../../../../../enums/CalendarWeekViewModeEnum";
import { language$ } from "../../../../../../../../../../services/LanguageService";

const [useLanguage] = bind(language$);
const [useCalendarWeekViewMode] = bind(calendarWeekViewMode$);

const WeekViewModeSelector = () => {
  const LANGUAGE = useLanguage();
  const calendarWeekViewMode = useCalendarWeekViewMode();

  return (
    <div className="app__sidebar__calendar__week-view-mode-selector">
      {Object.keys(CalendarWeekViewModeEnum).map((mode) => (
        <div
          key={mode}
          className={
            mode === calendarWeekViewMode
              ? "app__sidebar__calendar__week-view-mode-selector__item--active"
              : "app__sidebar__calendar__week-view-mode-selector__item"
          }
          onClick={() =>
            setCalendarWeekViewMode(mode as CalendarWeekViewModeEnum)
          }
        >
          {LANGUAGE.CALENDAR.WEEK_VIEW_MODE[mode]}
        </div>
      ))}
    </div>
  );
};

export default WeekViewModeSelector;
