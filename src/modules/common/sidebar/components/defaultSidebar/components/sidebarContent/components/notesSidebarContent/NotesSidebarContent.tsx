import React from "react";
import SidebarShortcuts from "../../../../../common/SidebarShortcuts";
import { ColorsEnum } from "../../../../../../../../../enums/ColorsEnum";
import { SidebarShortcutData } from "../../../../../../../../../models/ui/SidebarShortcutData";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { PathEnum } from "../../../../../../../../../enums/PathEnum";
import ShareIcon from "@mui/icons-material/Share";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteIcon from "@mui/icons-material/Delete";
import { bind } from "react-rxjs";
import { lastUsedNotes$ } from "../../../../../../../../../services/LastUsedItemsService";
import { language$ } from "../../../../../../../../../services/LanguageService";
import SidebarLastUsedItems from "../../../../../common/SidebarLastUsedItems";

const notesSidebarShortcuts: SidebarShortcutData[] = [
  {
    title: "YOUR_NOTES",
    icon: <NoteAltIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.NOTES + "/" + PathEnum.HOME,
  },
  {
    title: "SHARED",
    icon: <ShareIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.NOTES + "/" + PathEnum.SHARED,
  },
  {
    title: "FAVORITES",
    icon: <GradeIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.NOTES + "/" + PathEnum.FAVORITES,
  },
  {
    title: "DELETED",
    icon: <DeleteIcon />,
    path: "/" + PathEnum.APP + "/" + PathEnum.NOTES + "/" + PathEnum.DELETED,
  },
];

const [useLastUsedNotes] = bind(lastUsedNotes$);
const [useLanguage] = bind(language$);

const NotesSidebarContent = () => {
  const lastUsedNotes = useLastUsedNotes();
  const LANGUAGE = useLanguage();

  return (
    <React.Fragment>
      <SidebarShortcuts
        shortcuts={notesSidebarShortcuts}
        activeColor={ColorsEnum.RED}
      />
      <SidebarLastUsedItems
        items={lastUsedNotes}
        title={LANGUAGE.SIDEBAR.LAST_USED}
      />
    </React.Fragment>
  );
};

export default NotesSidebarContent;
