import { ValidatorFunction } from "../../../models/ui/ValidatorFunction";
import { ValidationResult } from "../../../models/ui/ValidationResult";

export const EmailValidator: ValidatorFunction = (
  value: string
): ValidationResult => {
  const hasError = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  const errorText = hasError ? "INVALID_EMAIL" : " ";
  return { hasError, errorText };
};
