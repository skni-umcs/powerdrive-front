import React, { useEffect } from "react";
import { PropsBase } from "../../../models/api/PropsBase";
import { useNavigate } from "react-router-dom";
import { authInitialized$, loggedUser$ } from "../../../services/AuthService";
import { PathEnum } from "../../../enums/PathEnum";
import { filter, switchMap } from "rxjs";

const SecuredContainer = ({ children }: PropsBase) => {
  const navigate = useNavigate();

  useEffect(() => {
    authInitialized$
      .pipe(
        filter(Boolean),
        switchMap(() => loggedUser$)
      )
      .subscribe((loggedUser) => {
        if (!loggedUser) navigate("/" + PathEnum.LOGIN);
      });
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SecuredContainer;
