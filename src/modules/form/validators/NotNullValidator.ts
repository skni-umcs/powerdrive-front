import { ValidatorFunction } from "../../../models/ui/ValidatorFunction";
import { ValidationResult } from "../../../models/ui/ValidationResult";

export const NotNullValidator: ValidatorFunction = (
  value: any
): ValidationResult => {
  const hasError = !value;
  const errorText = hasError ? "REQUIRED" : " ";
  return { hasError, errorText };
};
