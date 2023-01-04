import { LoginErrorTypeEnum } from "../../enums/LoginErrorTypeEnum";

export interface LoginResult {
  isSuccessful: boolean;
  error?: LoginErrorTypeEnum;
}
