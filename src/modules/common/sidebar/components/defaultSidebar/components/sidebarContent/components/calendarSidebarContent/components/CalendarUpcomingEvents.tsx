import React from "react";
import { upcomingEvents$ } from "../../../../../../../../../../services/CalendarService";
import { bind } from "react-rxjs";
import { UpcomingEventData } from "../../../../../../../../../../models/ui/UpcomingEventData";
import { language$ } from "../../../../../../../../../../services/LanguageService";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const getFormattedTitle = (title: string) => {
  if (title.length > 25) {
    return title.substring(0, 22) + "...";
  }
  return title;
};
const getFormattedMinutes = (minutes: number) => {
  if (minutes < 10) {
    return `0${minutes}`;
  }
  return minutes;
};

const generateEventDateString = (event: UpcomingEventData) => {
  let formattedDate =
    event.startDate.getDate() +
    "." +
    (event.startDate.getMonth() + 1) +
    "." +
    event.startDate.getFullYear() +
    " " +
    event.startDate.getHours() +
    ":" +
    getFormattedMinutes(event.startDate.getMinutes());
  if (
    event.startDate.getFullYear() === event.finishDate.getFullYear() &&
    event.startDate.getDate() === event.finishDate.getDate()
  ) {
    formattedDate +=
      "-" +
      event.finishDate.getHours() +
      ":" +
      getFormattedMinutes(event.finishDate.getMinutes());
  }

  return formattedDate;
};

const [useUpcomingEvents] = bind(upcomingEvents$);
const [useLanguage] = bind(language$);

const CalendarUpcomingEvents = () => {
  const upcomingEvents = useUpcomingEvents();
  const LANGUAGE = useLanguage();

  return (
    <div className="app__sidebar__upcoming-events">
      <div className="app__sidebar__upcoming-events__header">
        {LANGUAGE.CALENDAR.UPCOMING_EVENTS}
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      </div>
      <div className="app__sidebar__upcoming-events__items">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="app__sidebar__upcoming-events__item">
            <div
              className="app__sidebar__upcoming-events__item__symbol"
              style={{ backgroundColor: event.color }}
            />
            <div className="app__sidebar__upcoming-events__item__body">
              <div className="app__sidebar__upcoming-events__item__title">
                {getFormattedTitle(event.title)}
              </div>
              <div className="app__sidebar__upcoming-events__item__date">
                {generateEventDateString(event)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarUpcomingEvents;
