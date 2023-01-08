import React, { useEffect, useState } from "react";
import "../../../styles/sidebar.css";
import DefaultSidebar from "./components/defaultSidebar/DefaultSidebar";
import MobileSidebar from "./components/mobileSidebar/MobileSidebar";

const Sidebar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      {width < 768 ? <MobileSidebar /> : <DefaultSidebar />}
    </React.Fragment>
  );
};

export default Sidebar;
