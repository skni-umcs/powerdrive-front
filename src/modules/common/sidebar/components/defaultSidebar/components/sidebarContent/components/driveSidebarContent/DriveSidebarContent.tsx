import React from "react";
import SidebarShortcuts from "../../../../../common/SidebarShortcuts";
import { SidebarShortcutData } from "../../../../../../../../../models/ui/SidebarShortcutData";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ShareIcon from "@mui/icons-material/Share";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteIcon from "@mui/icons-material/Delete";
import { PathEnum } from "../../../../../../../../../enums/PathEnum";
import { ColorsEnum } from "../../../../../../../../../enums/ColorsEnum";
import SidebarLastUsedItems from "../../../../../common/SidebarLastUsedItems";
import { lastUsedFiles$ } from "../../../../../../../../../services/LastUsedItemsService";
import { bind } from "react-rxjs";
import { language$ } from "../../../../../../../../../services/LanguageService";

const driveSidebarShortcuts: SidebarShortcutData[] = [
  {
    title: "YOUR_FILES",
    icon: <InsertDriveFileIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.DRIVE + "/" + PathEnum.HOME,
  },
  {
    title: "SHARED",
    icon: <ShareIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.DRIVE + "/" + PathEnum.SHARED,
  },
  {
    title: "FAVORITES",
    icon: <GradeIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.DRIVE + "/" + PathEnum.FAVORITES,
  },
  {
    title: "DELETED",
    icon: <DeleteIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.DRIVE + "/" + PathEnum.DELETED,
  },
];

const [useLastUsedFiles] = bind(lastUsedFiles$);
const [useLanguage] = bind(language$);
const DriveSidebarContent = () => {
  const lastUsedFiles = useLastUsedFiles();
  const LANGUAGE = useLanguage();

  return (
    <React.Fragment>
      <SidebarShortcuts
        shortcuts={driveSidebarShortcuts}
        activeColor={ColorsEnum.BLUE}
      />
      <SidebarLastUsedItems
        items={lastUsedFiles}
        title={LANGUAGE.SIDEBAR.LAST_USED}
      />
    </React.Fragment>
  );
};

export default DriveSidebarContent;
