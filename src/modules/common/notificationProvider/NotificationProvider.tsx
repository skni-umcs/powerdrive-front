import React, { useEffect } from "react";
import { PropsBase } from "../../../models/api/PropsBase";
import { useSnackbar } from "notistack";
import { notificationStream$ } from "../../../services/NotificationService";
import { language$ } from "../../../services/LanguageService";
import { bind } from "react-rxjs";

const [useLanguage] = bind(language$);

const NotificationProvider = ({ children }: PropsBase) => {
  const LANGUAGE = useLanguage();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const subscription = notificationStream$.subscribe((notification) => {
      console.log(notification);
      enqueueSnackbar(
        LANGUAGE.NOTIFICATION[notification.type.toUpperCase()][
          notification.message
        ],
        {
          variant: notification.type,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default NotificationProvider;
