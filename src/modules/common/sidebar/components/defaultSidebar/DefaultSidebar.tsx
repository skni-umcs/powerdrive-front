import React from "react";
import SidebarContent from "./components/sidebarContent/SidebarContent";
import SidebarNavigation from "../common/SidebarNavigation";

const DefaultSidebar = () => {
  return (
    <div className="app__sidebar">
      <SidebarContent />
      <SidebarNavigation />
    </div>
  );
};

export default DefaultSidebar;
