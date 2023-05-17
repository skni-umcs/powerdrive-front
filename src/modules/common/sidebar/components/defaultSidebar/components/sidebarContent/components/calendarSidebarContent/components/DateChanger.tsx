import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  changeRangeToNextPeriod,
  changeRangeToPreviousPeriod,
  visibleDays$,
} from "../../../../../../../../../../services/CalendarService";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../../../../../services/LanguageService";
import { CalendarEvent } from "../../../../../../../../../../models/api/CalendarEvent";

const [useLanguage] = bind(language$);

const DateChanger = () => {
  const LANGUAGE = useLanguage();
  const [visibleDays, setVisibleDays] = useState<Date[]>();

  useEffect(() => {
    const subscription = visibleDays$.subscribe((days) => {
      setVisibleDays(days);
    });
    return () => subscription.unsubscribe();
  }, []);

  const getFormattedRange = () => {
    if (!visibleDays) return "";
    if (visibleDays.length === 1) {
      return LANGUAGE.CALENDAR.DAYS[visibleDays[0].getDay()];
    } else {
      return (
        LANGUAGE.CALENDAR.MONTHS[visibleDays[0].getMonth()] +
        " " +
        visibleDays[0].getFullYear()
      );
    }
  };
  return (
    <div className="app__sidebar__calendar__date-changer">
      <div
        className="app__sidebar__calendar__date-changer__icon"
        onClick={changeRangeToPreviousPeriod}
      >
        <ArrowBackIosNewIcon />
      </div>
      <div className="app__sidebar__calendar__date-changer__date">
        {getFormattedRange()}
      </div>
      <div
        className="app__sidebar__calendar__date-changer__icon"
        onClick={changeRangeToNextPeriod}
      >
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default DateChanger;
