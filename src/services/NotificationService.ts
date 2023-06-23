import { Subject } from "rxjs";
import { ErrorCodeEnum } from "../enums/ErrorCodeEnum";
import { NotificationData } from "../models/ui/NotificationData";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";

const notificationStream = new Subject<NotificationData>();
export const notificationStream$ = notificationStream.asObservable();

export const notify = (notification: NotificationData) => {
  notificationStream.next(notification);
};

export const notifyError = (error: ErrorCodeEnum) => {
  notificationStream.next({
    type: NotificationTypeEnum.ERROR,
    message: error.toString(),
  });
};
