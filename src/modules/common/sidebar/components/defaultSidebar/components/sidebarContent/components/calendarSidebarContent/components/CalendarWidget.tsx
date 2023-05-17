import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CalendarWidgetData } from "../../../../../../../../../../models/ui/CalendarWidgetData";
import { CalendarWidgetWeekData } from "../../../../../../../../../../models/ui/CalendarWidgetWeekData";
import { CalendarWidgetDayData } from "../../../../../../../../../../models/ui/CalendarWidgetDayData";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../../../../../services/LanguageService";
import { IconButton } from "@mui/material";
import { setSelectedDay } from "../../../../../../../../../../services/CalendarService";

const generateWeeks = (): CalendarWidgetWeekData[] => {
  const weeks = [];
  for (let i = 0; i < 6; i++) weeks.push({ weekNumber: i, days: [] });
  return weeks;
};
const generateCalendar = (year: number, month: number): CalendarWidgetData => {
  const calendar: CalendarWidgetData = {
    month: month,
    year: year,
    weeks: generateWeeks(),
  };

  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let currentDay;

  if ((firstDay.getDay() - 1) % 7 === 0) {
    currentDay = new Date(firstDay);
  } else {
    let lastDayOfPreviousMonth = new Date(year, month, 0);
    currentDay = new Date(
      lastDayOfPreviousMonth.setDate(
        lastDayOfPreviousMonth.getDate() -
          (firstDay.getDay() > 0 ? firstDay.getDay() - 1 : 6) +
          1
      )
    );
  }

  for (let week = 0; week < 6; week++) {
    for (let day = 0; day < 7; day++) {
      calendar.weeks[week].days.push({
        date: new Date(currentDay),
        isInactive: currentDay < firstDay || currentDay > lastDay,
        isToday:
          currentDay.getDate() === today.getDate() &&
          currentDay.getMonth() === today.getMonth() &&
          currentDay.getFullYear() === today.getFullYear(),
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  return calendar;
};

const getDayClassName = (day: CalendarWidgetDayData) => {
  let className = "app__sidebar__calendar__widget__body__week__day";

  if (day.isInactive) className += "--inactive";
  else if (day.isToday) className += "--today";

  return className;
};

const [useLanguage] = bind(language$);

const CalendarWidget = () => {
  const LANGUAGE = useLanguage();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [calendar, setCalendar] = useState<CalendarWidgetData>();

  useEffect(() => {
    setCalendar(generateCalendar(year, month));
  }, [year, month]);

  const handleIncreaseMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleDecreaseMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div className="app__sidebar__calendar__widget">
      <div className="app__sidebar__calendar__widget__header">
        <div className="app__sidebar__calendar__widget__header__date">
          {LANGUAGE.CALENDAR.MONTHS[month] + " " + year}
        </div>
        <div className="app__sidebar__calendar__widget__header__navigation">
          <IconButton size="small" onClick={handleDecreaseMonth}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleIncreaseMonth}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="app__sidebar__calendar__widget__body">
        {calendar?.weeks.map((week) => (
          <div
            key={week.weekNumber}
            className="app__sidebar__calendar__widget__body__week"
          >
            {week.days.map((day, idx) => (
              <div
                key={idx}
                onClick={(_) => setSelectedDay(day.date)}
                className={getDayClassName(day)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
