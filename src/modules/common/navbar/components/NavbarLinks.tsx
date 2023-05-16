import React from "react";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PathEnum } from "../../../../enums/PathEnum";
import { bind } from "react-rxjs";
import { language$ } from "../../../../services/LanguageService";
import { loggedUser$ } from "../../../../services/AuthService";
import { mobileView$ } from "../../../../services/DimensionsService";

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);

const NavbarLinks = () => {
  const LANGUAGE = useLanguage();
  const loggedUser = useLoggedUser();

  return (
    <React.Fragment>
      {!loggedUser && (
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
    </React.Fragment>
  );
};

export default NavbarLinks;
