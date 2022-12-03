import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase } from "@mui/material";

const Search = () => {
  return (
    <div className="app--navbar-search-container">
      <InputBase placeholder="Wyszukaj" />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
