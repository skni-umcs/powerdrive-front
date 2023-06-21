import { NotificationTypeEnum } from "../../enums/NotificationTypeEnum";

export interface NotificationData {
  type: NotificationTypeEnum;
  message: string;
}
