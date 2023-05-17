import React, { useEffect, useState } from "react";
import WeekViewHeader from "./components/WeekViewHeader";
import WeekViewTimeline from "./components/WeekViewTimeline";
import WeekViewContent from "./components/WeekViewContent";
import { Fab, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mobileView$ } from "../../../../services/DimensionsService";
import { bind } from "react-rxjs";
import AddEditEventDialog from "../../../common/dialogs/addEventDialog/AddEditEventDialog";
import { CalendarEvent } from "../../../../models/api/CalendarEvent";
import {
  createEvent,
  deleteEvent,
  openAddEventDialog$,
  sendOpenAddCalendarDialogEvent,
  sendOpenAddEventDialogEvent,
  setHighlightedEvent,
  updateEvent,
} from "../../../../services/CalendarService";
import EventIcon from "@mui/icons-material/Event";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { language$ } from "../../../../services/LanguageService";

const [useLanguage] = bind(language$);
const [useMobileView] = bind(mobileView$);

const CalendarWeekView = () => {
  const LANGUAGE = useLanguage();
  const mobileView = useMobileView();

  const [addMenuOpen, setAddMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleCloseAddMenu = () => {
    setAddMenuOpen(false);
  };

  const handleToggleAddMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuOpen(!addMenuOpen);
    setMenuAnchor(e.currentTarget);
  };

  const handleShowAddEventDialog = () => {
    setAddMenuOpen(false);
    sendOpenAddEventDialogEvent(undefined);
  };

  const handleShowAddCalendarDialog = () => {
    setAddMenuOpen(false);
    sendOpenAddCalendarDialogEvent();
  };

  return (
    <div className="app__calendar__week__container">
      <WeekViewHeader />
      <div className="app__calendar__week__content__container">
        <WeekViewTimeline />
        <WeekViewContent />
      </div>
      <Fab
        onClick={handleToggleAddMenu}
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
      <Menu
        open={addMenuOpen}
        onClose={handleCloseAddMenu}
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ mb: 4 }}
      >
        <MenuItem onClick={handleShowAddEventDialog}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText>{LANGUAGE.CALENDAR.ADD_EVENT}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShowAddCalendarDialog}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText>{LANGUAGE.CALENDAR.ADD_CALENDAR}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CalendarWeekView;
