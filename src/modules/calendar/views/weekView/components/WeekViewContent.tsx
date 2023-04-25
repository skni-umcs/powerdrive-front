import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { bind } from "react-rxjs";
import { visibleDays$ } from "../../../../../services/CalendarService";
import { CalendarTime } from "../../../../../models/ui/CalendarTime";
import { mobileView$ } from "../../../../../services/DimensionsService";

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

const getOffset = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return ((hours * 60 + minutes) / 1440) * 96;
};

const WeekViewContent = () => {
  const visibleDays = useVisibleDays();
  const mobileView = useMobileView();

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
        </div>
      ))}
    </div>
  );
};

export default WeekViewContent;
