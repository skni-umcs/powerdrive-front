import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { bind } from "react-rxjs";
import {
  calendarEvents$,
  highlightedEvent$,
  setHighlightedEvent,
  visibleDays$,
} from "../../../../../services/CalendarService";
import { CalendarTime } from "../../../../../models/ui/CalendarTime";
import { mobileView$ } from "../../../../../services/DimensionsService";
import { CalendarEvent } from "../../../../../models/api/CalendarEvent";

const dayTiles: CalendarTime[] = [
  { hour: 0, minute: 0 },
  { hour: 1, minute: 0 },
  { hour: 2, minute: 0 },
  { hour: 3, minute: 0 },
  { hour: 4, minute: 0 },
  { hour: 5, minute: 0 },
  { hour: 6, minute: 0 },
  { hour: 7, minute: 0 },
  { hour: 8, minute: 0 },
  { hour: 9, minute: 0 },
  { hour: 10, minute: 0 },
  { hour: 11, minute: 0 },
  { hour: 12, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 14, minute: 0 },
  { hour: 15, minute: 0 },
  { hour: 16, minute: 0 },
  { hour: 17, minute: 0 },
  { hour: 18, minute: 0 },
  { hour: 19, minute: 0 },
  { hour: 20, minute: 0 },
  { hour: 21, minute: 0 },
  { hour: 22, minute: 0 },
  { hour: 23, minute: 0 },
];

const [useVisibleDays] = bind(visibleDays$);
const [useMobileView] = bind(mobileView$);
const [useCalendarEvents] = bind(calendarEvents$);
const [useHighlightedEvent] = bind(highlightedEvent$);

const getOffset = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return ((hours * 60 + minutes) / 1440) * 96;
};

const prepareCalendarEvents = (
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] => {
  let overlappingEvents: (CalendarEvent | null)[] = [];

  let updatedEvents = [...events];
  updatedEvents = updatedEvents.filter(
    (event) => event.start_date.getDate() === day.getDate()
  );
  updatedEvents = updatedEvents.sort((a, b) =>
    a.eventOffset! - b.eventOffset! > 0 ? 1 : -1
  );

  updatedEvents.forEach((event, eventIdx) => {
    if (overlappingEvents.length === 0) {
      event.overlapIdx = 0;
      return overlappingEvents.push(event);
    }

    let firstNullId = -1;
    let isOverlapping = false;

    overlappingEvents.forEach((overlappingEvent, idx) => {
      if (overlappingEvent === null) {
        if (firstNullId === -1) {
          firstNullId = idx;
        }
      } else {
        if (
          overlappingEvent.eventOffset! + overlappingEvent.duration <
          event.eventOffset!
        ) {
          overlappingEvents[idx] = null;
          if (firstNullId === -1) {
            firstNullId = idx;
          }
        } else {
          isOverlapping = true;
        }
      }
    });

    if (isOverlapping) {
      if (firstNullId === -1) {
        event.overlapIdx = overlappingEvents.length;
        overlappingEvents.push(event);
      } else {
        event.overlapIdx = firstNullId;
        overlappingEvents[firstNullId] = event;
      }
    } else {
      for (let i = 0; i < eventIdx; i++) {
        if (!updatedEvents[i].overlapCount) {
          updatedEvents[i].overlapCount = overlappingEvents.length;
        }
      }
      event.overlapIdx = 0;
      overlappingEvents = [event];
    }
  });

  updatedEvents.forEach((event) => {
    if (!event?.overlapCount) {
      event.overlapCount = overlappingEvents.length;
    }
  });

  return updatedEvents;
};

const getFormattedTime = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate);
  endDate.setMinutes(startDate.getMinutes() + duration);

  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();

  const startHoursStr = startHours < 10 ? `0${startHours}` : startHours;
  const startMinutesStr = startMinutes < 10 ? `0${startMinutes}` : startMinutes;
  const endHoursStr = endHours < 10 ? `0${endHours}` : endHours;
  const endMinutesStr = endMinutes < 10 ? `0${endMinutes}` : endMinutes;

  return `${startHoursStr}:${startMinutesStr} - ${endHoursStr}:${endMinutesStr}`;
};

const getTextColor = (backgroundColor: string) => {
  const color = backgroundColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 120 ? "#ffffff" : "#000000";
};

const WeekViewContent = () => {
  const visibleDays = useVisibleDays();
  const mobileView = useMobileView();
  const calendarEvents = useCalendarEvents();
  const highlightedEvent = useHighlightedEvent();

  const [timeIndicatorOffset, setTimeIndicatorOffset] = React.useState(
    getOffset()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeIndicatorOffset(getOffset());
    }, 59999);

    return () => clearInterval(interval);
  });

  const handleAddEvent = (day: Date, time: CalendarTime) => {
    // TODO: Add event dialog
    console.log("Adding new calendar event: ", day, time);
  };

  const handleToggleEventDetails = (event: CalendarEvent) => {
    if (highlightedEvent?.id === event.id) {
      return setHighlightedEvent(null);
    }

    setHighlightedEvent(event);
  };

  return (
    <div className="app__calendar__week__content">
      <div
        className="app__calendar__week__time-indicator"
        style={{ top: `${timeIndicatorOffset}rem` }}
      />
      {visibleDays.map((day, dayIdx) => (
        <div key={dayIdx} className="app__calendar__week__content__day">
          {dayTiles.map((time, hourIdx) => (
            <div
              key={hourIdx}
              className="app__calendar__week__content__day__item__container"
            >
              <div
                onClick={() => handleAddEvent(day, time)}
                className="app__calendar__week__content__day__item"
              >
                <div className="app__calendar__week__content__day__item__icon">
                  <AddIcon />
                </div>
              </div>
            </div>
          ))}
          {prepareCalendarEvents(calendarEvents, day).map(
            (calendarEvent, idx) => (
              <div
                key={idx}
                className={
                  !!highlightedEvent && calendarEvent.id === highlightedEvent.id
                    ? "app__calendar__event--highlighted"
                    : "app__calendar__event"
                }
                style={{
                  top: `${(calendarEvent.eventOffset! * 4) / 60}rem`,
                  height: calendarEvent.duration,
                  backgroundColor: calendarEvent.block_color,
                  color: getTextColor(calendarEvent.block_color),
                  width: `${95 / calendarEvent.overlapCount!}%`,
                  left: `${
                    (calendarEvent.overlapIdx! * 100) /
                      calendarEvent.overlapCount! +
                    2.5 / calendarEvent.overlapCount!
                  }%`,
                }}
                onClick={() => handleToggleEventDetails(calendarEvent)}
              >
                <div className="app__calendar__event__title">
                  {calendarEvent.name}
                </div>
                <div className="app__calendar__event__subtitle">
                  {calendarEvent.description}
                </div>
                <div className="app__calendar__event__subtitle">
                  {getFormattedTime(
                    calendarEvent.start_date,
                    calendarEvent.duration
                  )}
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default WeekViewContent;
