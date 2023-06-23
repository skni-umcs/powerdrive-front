import React, { useState } from "react";
import { IconButton, Menu } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import {
  Language,
  language$,
  selectedLanguage$,
  setLanguage,
} from "../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../services/DimensionsService";
import { loggedUser$, logout } from "../../../../services/AuthService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { PathEnum } from "../../../../enums/PathEnum";

const [useMobileView] = bind(mobileView$);
const [useLoggedUser] = bind(loggedUser$);
const [useLanguage] = bind(language$);
const [useSelectedLanguage] = bind(selectedLanguage$);

const NavbarAccount = () => {
  const LANGUAGE = useLanguage();
  const selectedLanguage = useSelectedLanguage();
  const mobileView = useMobileView();
  const loggedUser = useLoggedUser();
  const navigate = useNavigate();
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    setAnchorMenu(null);
    logout();
  };

  const handleSettings = () => {
    setAnchorMenu(null);
    navigate(`${PathEnum.APP}/${PathEnum.SETTINGS}`);
  };

  return (
    <React.Fragment>
      {!!loggedUser && (
        <div
          className="app__navbar-account"
          aria-label="curren user account"
          aria-haspopup="true"
          onClick={(event) => setAnchorMenu(event.currentTarget)}
        >
          {!mobileView && (
            <div>{`${loggedUser.first_name} ${loggedUser.last_name}`}</div>
          )}
          <IconButton disabled={!mobileView} size="large" edge="end">
            <AccountCircle />
          </IconButton>
        </div>
      )}
      <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={() => setAnchorMenu(null)}
      >
        <div className="app__navbar__menu">
          <div className="app__navbar__menu__user-details">
            <div className="app__navbar__menu__user-details__icon">
              <AccountCircleIcon fontSize="large" />
            </div>
            <div className="app__navbar__menu__user-details__info">
              <div className="app__navbar__menu__user-details__title">
                {`${loggedUser?.first_name} ${loggedUser?.last_name} (${loggedUser?.username})`}
              </div>
              <div className="app__navbar__menu__user-details__subtitle">
                {loggedUser?.email}
              </div>
            </div>
          </div>
          <div className="app__navbar__menu__actions">
            <div
              className="app__navbar__menu__actions__item"
              onClick={handleSettings}
            >
              <div className="app__navbar__menu__actions__item__icon">
                <SettingsIcon />
              </div>
              <div className="app__navbar__menu__actions__item__label">
                {LANGUAGE.NAVBAR.SETTINGS}
              </div>
            </div>
            <div
              className="app__navbar__menu__actions__item"
              onClick={handleLogout}
            >
              <div className="app__navbar__menu__actions__item__icon">
                <LogoutIcon />
              </div>
              <div className="app__navbar__menu__actions__item__label">
                {LANGUAGE.NAVBAR.LOGOUT}
              </div>
            </div>
          </div>
          <div className="app__navbar__menu__languages">
            <div
              className={
                selectedLanguage === Language.PL
                  ? "app__navbar__menu__languages__language--active"
                  : "app__navbar__menu__languages__language"
              }
              onClick={() => setLanguage(Language.PL)}
            >
              <img
                src={require("../../../../assets/images/pl.png")}
                className="app__navbar__menu__languages__language__icon"
              />
              <div className="app__navbar__menu__languages__language__label">
                {LANGUAGE.NAVBAR.LANGUAGES.PL}
              </div>
            </div>
            <div
              className={
                selectedLanguage === Language.EN
                  ? "app__navbar__menu__languages__language--active"
                  : "app__navbar__menu__languages__language"
              }
              onClick={() => setLanguage(Language.EN)}
            >
              <img
                src={require("../../../../assets/images/en.png")}
                className="app__navbar__menu__languages__language__icon"
              />
              <div className="app__navbar__menu__languages__language__label">
                {LANGUAGE.NAVBAR.LANGUAGES.EN}
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </React.Fragment>
  );
};

export default NavbarAccount;
