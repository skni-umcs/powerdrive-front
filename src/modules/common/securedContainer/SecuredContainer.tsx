import React, { useEffect } from "react";
import { PropsBase } from "../../../models/api/PropsBase";
import { useNavigate } from "react-router-dom";
import { identityUpdated$, loggedUser$ } from "../../../services/AuthService";
import { PathEnum } from "../../../enums/PathEnum";
import { switchMap } from "rxjs";

const SecuredContainer = ({ children }: PropsBase) => {
  const navigate = useNavigate();

  useEffect(() => {
    const subscription = identityUpdated$
      .pipe(switchMap(() => loggedUser$))
      .subscribe((loggedUser) => {
        if (!loggedUser) navigate("/" + PathEnum.LOGIN);
      });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SecuredContainer;
