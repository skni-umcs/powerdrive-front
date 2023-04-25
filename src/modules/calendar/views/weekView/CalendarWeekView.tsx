import React from "react";
import WeekViewHeader from "./components/WeekViewHeader";
import WeekViewTimeline from "./components/WeekViewTimeline";
import WeekViewContent from "./components/WeekViewContent";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mobileView$ } from "../../../../services/DimensionsService";
import { bind } from "react-rxjs";

const [useMobileView] = bind(mobileView$);

const CalendarWeekView = () => {
  const mobileView = useMobileView();

  return (
    <div className="app__calendar__week__container">
      <WeekViewHeader />
      <div className="app__calendar__week__content__container">
        <WeekViewTimeline />
        <WeekViewContent />
      </div>
      <Fab
        sx={{
          "&:hover": {
            backgroundColor: "#2A5434",
          },
          backgroundColor: "#3F784C",
          color: "#fff",
          position: "absolute",
          bottom: mobileView ? 66 : 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default CalendarWeekView;
