import React from "react";
import "../../../styles/sidebar.css";
import DefaultSidebar from "./components/defaultSidebar/DefaultSidebar";
import MobileSidebar from "./components/mobileSidebar/MobileSidebar";
import { mobileView$ } from "../../../services/DimensionsService";
import { bind } from "react-rxjs";
import { Drawer } from "@mui/material";
import { closeSidebar, sidebarOpened$ } from "../../../services/SidebarService";

const [useMobileView] = bind(mobileView$);
const [useSidebarOpened] = bind(sidebarOpened$);

const Sidebar = () => {
  const mobileView = useMobileView();
  const sidebarOpened = useSidebarOpened();

  return (
    <React.Fragment>
      {mobileView ? (
        <React.Fragment>
          <MobileSidebar />
          <Drawer open={sidebarOpened} onClose={() => closeSidebar()}>
            <DefaultSidebar />
          </Drawer>
        </React.Fragment>
      ) : (
        <DefaultSidebar />
      )}
    </React.Fragment>
  );
};

export default Sidebar;
