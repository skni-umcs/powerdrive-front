import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import Search from "../search/Search";
import "../../../styles/navbar.css";
import NavbarCalendarControls from "./components/NavbarCalendarControls";
import NavbarLogo from "./components/NavbarLogo";
import NavbarAccount from "./components/NavbarAccount";
import NavbarLinks from "./components/NavbarLinks";
import NavbarSidebarHandle from "./components/NavbarSidebarHandle";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: 3, zIndex: 150 }}>
      <Toolbar
        color="primary"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavbarLogo />
        <Search />
        <NavbarCalendarControls />
        <NavbarAccount />
        <NavbarLinks />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
