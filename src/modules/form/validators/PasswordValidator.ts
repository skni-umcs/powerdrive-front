import { ValidatorFunction } from "../../../models/ui/ValidatorFunction";
import { ValidationResult } from "../../../models/ui/ValidationResult";

export const PasswordValidator: ValidatorFunction = (
  value: string
): ValidationResult => {
  const hasError = value.length < 8;
  const errorText = hasError ? "PASSWORD_TOO_SHORT" : " ";
  return { hasError, errorText };
};
