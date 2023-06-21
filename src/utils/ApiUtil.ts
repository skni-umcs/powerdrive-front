import { ErrorCodeEnum } from "../enums/ErrorCodeEnum";

export const getErrorCode = (error: any): ErrorCodeEnum => {
  console.log(error);
  if (error.response && error.response.data) {
    if (
      Array.isArray(error.response.data.detail) &&
      error.response.data.detail.length > 0
    ) {
      return analyzeError(error.response.data.detail[0].msg);
    }

    if (error.response.data.detail) {
      return analyzeError(error.response.data.detail);
    }
  }
  return ErrorCodeEnum.UNKNOWN;
};

const analyzeError = (error: string): ErrorCodeEnum => {
  switch (error) {
    case "Password must contain at least one uppercase letter":
      return ErrorCodeEnum.PASSWORD_UPPERCASE_ERROR;
    case "Password must contain at least one lowercase letter":
      return ErrorCodeEnum.PASSWORD_LOWERCASE_ERROR;
    case "Password must contain at least one digit":
      return ErrorCodeEnum.PASSWORD_DIGIT_ERROR;
    case "Password must contain at least one special character":
      return ErrorCodeEnum.PASSWORD_SPECIAL_CHARACTER_ERROR;
    case "User with given email already exists":
      return ErrorCodeEnum.EMAIL_ALREADY_IN_USE;
    case "User with given username already exists":
      return ErrorCodeEnum.USERNAME_ALREADY_IN_USE;
    default:
      return ErrorCodeEnum.UNKNOWN;
  }
};
