import React from "react";
import { SidebarShortcutData } from "../../../../../models/ui/SidebarShortcutData";
import { language$ } from "../../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorsEnum } from "../../../../../enums/ColorsEnum";

const [useLanguage] = bind(language$);
interface SidebarShortcutsProps {
  shortcuts: SidebarShortcutData[];
  activeColor: ColorsEnum;
}
const SidebarShortcuts = ({
  shortcuts,
  activeColor,
}: SidebarShortcutsProps) => {
  const LANGUAGE = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app__sidebar__shortcuts">
      {shortcuts.map((shortcut) => (
        <div
          key={shortcut.title}
          className={
            location.pathname.startsWith(shortcut.path)
              ? "app__sidebar__shortcut--active"
              : "app__sidebar__shortcut"
          }
          style={
            location.pathname.startsWith(shortcut.path)
              ? { backgroundColor: activeColor }
              : {}
          }
          onClick={() => navigate(shortcut.path)}
        >
          <div className="app__sidebar__shortcut__icon">{shortcut.icon}</div>
          <div className="app__sidebar__shortcut__title">
            {LANGUAGE.SIDEBAR[shortcut.title]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarShortcuts;
