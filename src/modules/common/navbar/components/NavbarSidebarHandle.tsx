import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleSidebar } from "../../../../services/SidebarService";
import { mobileView$ } from "../../../../services/DimensionsService";
import { bind } from "react-rxjs";

const [useMobileView] = bind(mobileView$);

const NavbarSidebarHandle = () => {
  const mobileView = useMobileView();
  return (
    <React.Fragment>
      {mobileView && (
        <IconButton onClick={() => toggleSidebar()}>
          <MenuIcon />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default NavbarSidebarHandle;
