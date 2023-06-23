import React from "react";
import SidebarContent from "./components/sidebarContent/SidebarContent";
import SidebarNavigation from "../common/SidebarNavigation";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../../services/DimensionsService";

const [useMobileView] = bind(mobileView$);

const DefaultSidebar = () => {
  const mobileView = useMobileView();

  return (
    <div className="app__sidebar">
      <SidebarContent />
      {!mobileView && <SidebarNavigation />}
    </div>
  );
};

export default DefaultSidebar;
