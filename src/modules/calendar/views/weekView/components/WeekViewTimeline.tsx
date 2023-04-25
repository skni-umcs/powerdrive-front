import React from "react";

const timelineItems = [
  { id: 1, name: "00:00" },
  { id: 2, name: "01:00" },
  { id: 3, name: "02:00" },
  { id: 4, name: "03:00" },
  { id: 5, name: "04:00" },
  { id: 6, name: "05:00" },
  { id: 7, name: "06:00" },
  { id: 8, name: "07:00" },
  { id: 9, name: "08:00" },
  { id: 10, name: "09:00" },
  { id: 11, name: "10:00" },
  { id: 12, name: "11:00" },
  { id: 13, name: "12:00" },
  { id: 14, name: "13:00" },
  { id: 15, name: "14:00" },
  { id: 16, name: "15:00" },
  { id: 17, name: "16:00" },
  { id: 18, name: "17:00" },
  { id: 19, name: "18:00" },
  { id: 20, name: "19:00" },
  { id: 21, name: "20:00" },
  { id: 22, name: "21:00" },
  { id: 23, name: "22:00" },
  { id: 24, name: "23:00" },
];

const WeekViewTimeline = () => {
  return (
    <div className="app__calendar__week__timeline">
      {timelineItems.map((item) => (
        <div className="app__calendar__week__timeline__item">{item.name}</div>
      ))}
    </div>
  );
};

export default WeekViewTimeline;
