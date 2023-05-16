import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import { language$ } from "../../../services/LanguageService";
import { bind } from "react-rxjs";
import { loggedUser$ } from "../../../services/AuthService";
import { mobileView$ } from "../../../services/DimensionsService";
import { PathEnum } from "../../../enums/PathEnum";
import { useLocation } from "react-router-dom";

const [useLanguage] = bind(language$);
const [useLoggedUser] = bind(loggedUser$);
const [useMobileView] = bind(mobileView$);

const Search = () => {
  const location = useLocation();
  const mobileView = useMobileView();
  const loggedUser = useLoggedUser();
  const LANGUAGE = useLanguage();

  const locationCalendar = location.pathname.startsWith(
    "/" + PathEnum.APP + "/" + PathEnum.CALENDAR
  );

  return (
    <React.Fragment>
      {loggedUser && (!mobileView || !locationCalendar) && (
        <div className="app__navbar-search-container">
          <InputBase placeholder={LANGUAGE.NAVBAR.SEARCH} />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default Search;
