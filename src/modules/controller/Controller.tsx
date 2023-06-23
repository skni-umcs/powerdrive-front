import React from "react";
import Navbar from "../common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavigationProvider from "../../providers/NavigationProvider";

const Controller = () => {
  return (
    <NavigationProvider>
      <React.Fragment>
        <Navbar />
        <div className="app__global__container">
          <Outlet />
        </div>
      </React.Fragment>
    </NavigationProvider>
  );
};

export default Controller;
