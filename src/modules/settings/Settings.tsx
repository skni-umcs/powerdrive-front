import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PathEnum } from "../../enums/PathEnum";
import "../../styles/settings.css";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/" + PathEnum.APP + "/" + PathEnum.SETTINGS) {
      navigate(
        "/" + PathEnum.APP + "/" + PathEnum.SETTINGS + "/" + PathEnum.GENERAL
      );
    }
  }, []);

  return <Outlet />;
};

export default Settings;
