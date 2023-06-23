import React from "react";
import { IconButton, Typography } from "@mui/material";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../services/DimensionsService";
import NavbarSidebarHandle from "./NavbarSidebarHandle";
import { navigate } from "../../../../services/NavigationService";

const [useMobileView] = bind(mobileView$);

const NavbarLogo = () => {
  const mobileView = useMobileView();

  return (
    <div className="app__navbar-logo">
      <NavbarSidebarHandle />
      <IconButton onClick={() => navigate("/")}>
        <img src={require("../../../../assets/images/driveLogo.png")} alt="" />
      </IconButton>
      {!mobileView && (
        <Typography variant="h6" component="div">
          Power Drive
        </Typography>
      )}
    </div>
  );
};

export default NavbarLogo;
