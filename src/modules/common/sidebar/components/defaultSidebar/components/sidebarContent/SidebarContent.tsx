import React from "react";
import { useLocation } from "react-router-dom";
import DriveSidebarContent from "./components/driveSidebarContent/DriveSidebarContent";
import CalendarSidebarContent from "./components/calendarSidebarContent/CalendarSidebarContent";
import NotesSidebarContent from "./components/notesSidebarContent/NotesSidebarContent";
import { PathEnum } from "../../../../../../../enums/PathEnum";

const SidebarContent = () => {
  const location = useLocation();

  return (
    <div className="app__sidebar__content">
      {location.pathname.startsWith(
        "/" + PathEnum.APP + "/" + PathEnum.DRIVE
      ) ? (
        <DriveSidebarContent />
      ) : location.pathname.startsWith(
          "/" + PathEnum.APP + "/" + PathEnum.CALENDAR
        ) ? (
        <CalendarSidebarContent />
      ) : location.pathname.startsWith(
          "/" + PathEnum.APP + "/" + PathEnum.NOTES
        ) ? (
        <NotesSidebarContent />
      ) : null}
    </div>
  );
};

export default SidebarContent;
