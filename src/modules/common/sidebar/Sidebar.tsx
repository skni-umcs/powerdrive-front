import React from "react";
import "../../../styles/sidebar.css";
import DefaultSidebar from "./components/defaultSidebar/DefaultSidebar";
import MobileSidebar from "./components/mobileSidebar/MobileSidebar";
import { mobileView$ } from "../../../services/DimensionsService";
import { bind } from "react-rxjs";

const [useMobileView] = bind(mobileView$);

const Sidebar = () => {
  const mobileView = useMobileView();

  return (
    <React.Fragment>
      {mobileView ? <MobileSidebar /> : <DefaultSidebar />}
    </React.Fragment>
  );
};

export default Sidebar;
