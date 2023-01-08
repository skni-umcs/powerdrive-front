import React from "react";
import { SidebarNavigationItemData } from "models/ui/SidebarNavigationItemData";
import { PathEnum } from "enums/PathEnum";
import StorageIcon from "@mui/icons-material/Storage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorsEnum } from "../../../../../enums/ColorsEnum";
import { Tooltip } from "@mui/material";
import { language$ } from "../../../../../services/LanguageService";
import { bind } from "react-rxjs";

const sidebarNavigationItems: SidebarNavigationItemData[] = [
  {
    name: "DRIVE",
    icon: <StorageIcon />,
    path: PathEnum.DRIVE,
    color: ColorsEnum.BLUE,
  },
  {
    name: "CALENDAR",
    icon: <CalendarMonthIcon />,
    path: PathEnum.CALENDAR,
    color: ColorsEnum.GREEN,
  },
  {
    name: "NOTES",
    icon: <DescriptionIcon />,
    path: PathEnum.NOTES,
    color: ColorsEnum.RED,
  },
];

const [useLanguage] = bind(language$);
const SidebarNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const LANGUAGE = useLanguage();

  const handleNavigate = (path: PathEnum) => {
    navigate("/" + PathEnum.APP + "/" + path);
  };

  return (
    <div className="app__sidebar__navigation">
      {sidebarNavigationItems.map((item) => (
        <Tooltip
          key={item.name}
          title={LANGUAGE.SIDEBAR[item.name]}
          placement="top"
        >
          <div
            className={
              location.pathname.startsWith("/" + PathEnum.APP + "/" + item.path)
                ? "app__sidebar__navigation__item--active"
                : "app__sidebar__navigation__item"
            }
            style={
              location.pathname.startsWith("/" + PathEnum.APP + "/" + item.path)
                ? { backgroundColor: item.color }
                : {}
            }
            onClick={() => handleNavigate(item.path)}
          >
            {item.icon}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default SidebarNavigation;
