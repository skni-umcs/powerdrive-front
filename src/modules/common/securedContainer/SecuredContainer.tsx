import React, { useEffect } from "react";
import { PropsBase } from "../../../models/api/PropsBase";
import { useLocation } from "react-router-dom";
import { identityUpdated$, loggedUser$ } from "../../../services/AuthService";
import { PathEnum } from "../../../enums/PathEnum";
import { filter, switchMap } from "rxjs";
import { navigate } from "../../../services/NavigationService";
import { notifyError } from "../../../services/NotificationService";
import { ErrorCodeEnum } from "../../../enums/ErrorCodeEnum";

const SecuredContainer = ({ children }: PropsBase) => {
  const location = useLocation();

  useEffect(() => {
    const subscription = identityUpdated$
      .pipe(
        filter(Boolean),
        switchMap(() => loggedUser$)
      )
      .subscribe((loggedUser) => {
        if (!loggedUser) {
          navigate("/" + PathEnum.LOGIN);
          notifyError(ErrorCodeEnum.UNAUTHORIZED_PAGE);
        }
      });

    return () => subscription.unsubscribe();
  }, [location]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default SecuredContainer;
