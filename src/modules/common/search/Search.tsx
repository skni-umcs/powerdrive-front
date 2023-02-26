import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import { language$ } from "../../../services/LanguageService";
import { bind } from "react-rxjs";

const [useLanguage] = bind(language$);
const Search = () => {
  const LANGUAGE = useLanguage();
  return (
    <div className="app__navbar-search-container">
      <InputBase placeholder={LANGUAGE.NAVBAR.SEARCH} />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
