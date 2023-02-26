import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PathEnum } from "../../enums/PathEnum";

const Notes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/" + PathEnum.APP + "/" + PathEnum.NOTES) {
      navigate("/" + PathEnum.APP + "/" + PathEnum.NOTES + "/" + PathEnum.HOME);
    }
  }, []);

  return <Outlet />;
};

export default Notes;
