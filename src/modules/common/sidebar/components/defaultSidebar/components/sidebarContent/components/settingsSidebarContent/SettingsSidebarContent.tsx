import React from "react";
import { ColorsEnum } from "../../../../../../../../../enums/ColorsEnum";
import SidebarShortcuts from "../../../../../common/SidebarShortcuts";
import { SidebarShortcutData } from "../../../../../../../../../models/ui/SidebarShortcutData";
import { PathEnum } from "../../../../../../../../../enums/PathEnum";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import StorageIcon from "@mui/icons-material/Storage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";

const settingsSidebarShortcuts: SidebarShortcutData[] = [
  {
    title: "GENERAL",
    icon: <SettingsIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.GENERAL,
  },
  {
    title: "ACCOUNT",
    icon: <ManageAccountsIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.ACCOUNT,
  },
  {
    title: "DRIVE",
    icon: <StorageIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.DRIVE,
  },
  {
    title: "CALENDAR",
    icon: <CalendarMonthIcon />,
    path:
      "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.CALENDAR,
  },
  {
    title: "NOTES",
    icon: <DescriptionIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.NOTES,
  },
];

const SettingsSidebarContent = () => {
  return (
    <SidebarShortcuts
      shortcuts={settingsSidebarShortcuts}
      activeColor={ColorsEnum.BLUE}
    />
  );
};

export default SettingsSidebarContent;
