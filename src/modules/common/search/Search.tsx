import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";
import { LANGUAGE } from "../../../services/LanguageService";

const Search = () => {
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
