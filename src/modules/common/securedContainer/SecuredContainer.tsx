import React, { useEffect } from "react";
import { PropsBase } from "../../../models/api/PropsBase";
import { useLocation, useNavigate } from "react-router-dom";
import { identityUpdated$, loggedUser$ } from "../../../services/AuthService";
import { PathEnum } from "../../../enums/PathEnum";
import { switchMap } from "rxjs";

const SecuredContainer = ({ children }: PropsBase) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = identityUpdated$
      .pipe(switchMap(() => loggedUser$))
      .subscribe((loggedUser) => {
        console.log(loggedUser);
        if (!loggedUser) navigate("/" + PathEnum.LOGIN);
      });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SecuredContainer;
