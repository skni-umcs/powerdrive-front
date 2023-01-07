import React from "react";
import { SidebarNavigationItemData } from "models/ui/SidebarNavigationItemData";
import { PathEnum } from "enums/PathEnum";
// @ts-ignore
import DriveIcon from "assets/icons/drive.png";
// @ts-ignore
import CalendarIcon from "assets/icons/calendar.png";
// @ts-ignore
import NotesIcon from "assets/icons/notes.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorsEnum } from "../../../../enums/ColorsEnum";
import { Tooltip } from "@mui/material";

const sidebarNavigationItems: SidebarNavigationItemData[] = [
  {
    name: "Drive",
    icon: DriveIcon,
    path: PathEnum.DRIVE,
    color: ColorsEnum.BLUE,
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    path: PathEnum.CALENDAR,
    color: ColorsEnum.GREEN,
  },
  {
    name: "Notes",
    icon: NotesIcon,
    path: PathEnum.NOTES,
    color: ColorsEnum.RED,
  },
];
const SidebarNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: PathEnum) => {
    navigate("/" + PathEnum.APP + "/" + path);
  };

  return (
    <div className="app__sidebar__navigation">
      {sidebarNavigationItems.map((item) => (
        <Tooltip key={item.name} title={item.name} placement="top">
          <div
            className={
              location.pathname.includes(item.path)
                ? "app__sidebar__navigation__item--active"
                : "app__sidebar__navigation__item"
            }
            style={
              location.pathname.includes(item.path)
                ? { backgroundColor: item.color }
                : {}
            }
            onClick={() => handleNavigate(item.path)}
          >
            <img src={item.icon} />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default SidebarNavigation;
