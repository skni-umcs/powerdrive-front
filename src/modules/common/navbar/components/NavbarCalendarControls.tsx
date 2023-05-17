import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import { bind } from "react-rxjs";
import { loggedUser$ } from "../../../../services/AuthService";
import { mobileView$ } from "../../../../services/DimensionsService";
import { useLocation } from "react-router-dom";
import { PathEnum } from "../../../../enums/PathEnum";
import { IconButton } from "@mui/material";
import {
  calendarWeekViewMode$,
  changeRangeToNextPeriod,
  changeRangeToPreviousPeriod,
  setCalendarWeekViewMode,
} from "../../../../services/CalendarService";
import { language$ } from "../../../../services/LanguageService";
import { CalendarWeekViewModeEnum } from "../../../../enums/CalendarWeekViewModeEnum";

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);
const [useMobileView] = bind(mobileView$);
const [useWeekViewMode] = bind(calendarWeekViewMode$);

const NavbarCalendarControls = () => {
  const LANGUAGE = useLanguage();
  const location = useLocation();
  const mobileView = useMobileView();
  const loggedUser = useLoggedUser();
  const viewMode = useWeekViewMode();

  const locationCalendar = location.pathname.startsWith(
    "/" + PathEnum.APP + "/" + PathEnum.CALENDAR
  );

  const handleChangeViewMode = () => {
    setCalendarWeekViewMode(
      CalendarWeekViewModeEnum.DAY === viewMode
        ? CalendarWeekViewModeEnum.SCHEDULE
        : CalendarWeekViewModeEnum.DAY
    );
  };

  return (
    <React.Fragment>
      {locationCalendar && mobileView && loggedUser && (
        <div className="app__navbar__calendar-controls">
          <IconButton size="small" onClick={changeRangeToPreviousPeriod}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <div
            className="app__navbar__calendar-controls__view-mode"
            onClick={handleChangeViewMode}
          >
            {CalendarWeekViewModeEnum.DAY === viewMode ? (
              <CalendarViewDayIcon />
            ) : (
              <CalendarViewWeekIcon />
            )}
            <div className="app__navbar__calendar-controls__view-mode__name">
              {LANGUAGE.CALENDAR.WEEK_VIEW_MODE[viewMode]}
            </div>
          </div>
          <IconButton size="small" onClick={changeRangeToNextPeriod}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default NavbarCalendarControls;
