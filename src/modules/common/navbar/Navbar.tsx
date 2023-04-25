import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import Search from "../search/Search";
import { AccountCircle } from "@mui/icons-material";
import "../../../styles/navbar.css";
import { bind } from "react-rxjs";
import { loggedUser$, logout } from "../../../services/AuthService";
import { NavLink } from "react-router-dom";
import { PathEnum } from "../../../enums/PathEnum";
import {
  Language,
  language$,
  setLanguage,
} from "../../../services/LanguageService";
import { mobileView$ } from "../../../services/DimensionsService";

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);
const [useMobileView] = bind(mobileView$);
const Navbar = () => {
  const LANGUAGE = useLanguage();
  const mobileView = useMobileView();
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const loggedUser = useLoggedUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 3, zIndex: 150 }}>
      <Toolbar
        color="primary"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="app__navbar-logo">
          <IconButton>
            <img src={require("../../../assets/images/driveLogo.png")} alt="" />
          </IconButton>
          <Typography variant="h6" component="div">
            Power Drive
          </Typography>
        </div>
        {loggedUser ? (
          <React.Fragment>
            {!mobileView && <Search />}
            <div className="app__navbar-account">
              {!mobileView && (
                <div>{`${loggedUser.first_name} ${loggedUser.last_name}`}</div>
              )}
              <IconButton
                size="large"
                edge="end"
                aria-label="curren user account"
                aria-haspopup="true"
                onClick={(event) => setAnchorMenu(event.currentTarget)}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorMenu}
                open={Boolean(anchorMenu)}
                onClose={() => setAnchorMenu(null)}
              >
                <Button onClick={handleLogout}>Logout</Button>
                <Button onClick={() => setLanguage(Language.PL)}>PL</Button>
                <Button onClick={() => setLanguage(Language.EN)}>EN</Button>
              </Menu>
            </div>
          </React.Fragment>
        ) : (
          <Box>
            <NavLink
              className={({ isActive }) =>
                isActive ? "app__navbar-link--active" : "app__navbar-link"
              }
              to={PathEnum.LOGIN}
            >
              {LANGUAGE.NAVBAR.LOGIN}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "app__navbar-link--active" : "app__navbar-link"
              }
              to={PathEnum.REGISTER}
            >
              {LANGUAGE.NAVBAR.REGISTER}
            </NavLink>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
