import React, { useState } from "react";
import { Button, IconButton, Menu } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Language, setLanguage } from "../../../../services/LanguageService";
import { bind } from "react-rxjs";
import { mobileView$ } from "../../../../services/DimensionsService";
import { loggedUser$, logout } from "../../../../services/AuthService";

const [useMobileView] = bind(mobileView$);
const [useLoggedUser] = bind(loggedUser$);

const NavbarAccount = () => {
  const mobileView = useMobileView();
  const loggedUser = useLoggedUser();
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      {!!loggedUser && (
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
      )}
    </React.Fragment>
  );
};

export default NavbarAccount;
