import React, { useEffect, useState } from "react";
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
import { useCookies } from "react-cookie";
import { CookiesEnum } from "../../../enums/CookiesEnum";

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);
const Navbar = () => {
  const LANGUAGE = useLanguage();
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const loggedUser = useLoggedUser();
  const [width, setWidth] = useState(window.innerWidth);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    removeCookie(CookiesEnum.USER);
    console.log("Removing cookie");
    logout();
  };

  return (
    <AppBar position="static">
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
            {width > 768 ? <Search /> : null}
            <div className="app__navbar-account">
              <div>Jan Kowalski</div>
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
