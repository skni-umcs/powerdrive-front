import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Search from "../search/Search";
import { AccountCircle } from "@mui/icons-material";
import "../../../styles/navbar.css";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        color="primary"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="app--navbar-logo">
          <IconButton>
            <img src={require("../../../assets/images/driveLogo.png")} alt="" />
          </IconButton>
          <Typography variant="h6" component="div">
            Power Drive
          </Typography>
        </div>
        <Search />
        <div className="app--navbar-account">
          <div>Jan Kowalski</div>
          <IconButton
            size="large"
            edge="end"
            aria-label="curren user account"
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
