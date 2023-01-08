import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PathEnum } from "../../enums/PathEnum";

const Drive = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/" + PathEnum.APP + "/" + PathEnum.DRIVE) {
      navigate("/" + PathEnum.APP + "/" + PathEnum.DRIVE + "/" + PathEnum.HOME);
    }
  }, []);
  return <Outlet />;
};

export default Drive;
