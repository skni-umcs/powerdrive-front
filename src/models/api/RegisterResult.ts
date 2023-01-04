import { RegisterErrorTypeEnum } from "../../enums/RegisterErrorTypeEnum";

export interface RegisterResult {
  isSuccessful: boolean;
  error?: RegisterErrorTypeEnum;
}
