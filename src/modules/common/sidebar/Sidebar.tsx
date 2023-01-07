import React from "react";
import "../../../styles/sidebar.css";
import SidebarNavigation from "./components/SidebarNavigation";
import SidebarContent from "./components/sidebarContent/SidebarContent";

const Sidebar = () => {
  return (
    <div className="app__sidebar">
      <SidebarContent />
      <SidebarNavigation />
    </div>
  );
};

export default Sidebar;
