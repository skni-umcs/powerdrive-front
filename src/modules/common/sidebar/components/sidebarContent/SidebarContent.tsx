import React from "react";
import SidebarLinks from "./components/SidebarLinks";
import SidebarLastUsedFiles from "./components/SidebarLastUsedFiles";

const SidebarContent = () => {
  return (
    <div className="app__sidebar__content">
      <SidebarLinks />
      <SidebarLastUsedFiles />
    </div>
  );
};

export default SidebarContent;
