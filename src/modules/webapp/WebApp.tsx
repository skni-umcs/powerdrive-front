import React from "react";
import SecuredContainer from "../common/securedContainer/SecuredContainer";
import Sidebar from "../common/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const WebApp = () => {
  return (
    <SecuredContainer>
      <React.Fragment>
        <Sidebar />
        <div className="app__content__container">
          <Outlet />
        </div>
      </React.Fragment>
    </SecuredContainer>
  );
};

export default WebApp;
