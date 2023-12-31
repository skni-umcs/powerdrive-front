import { ValidationResult } from "../../../models/ui/ValidationResult";
import { ValidatorFunction } from "../../../models/ui/ValidatorFunction";

export const RequiredValidator: ValidatorFunction = (
  value: string
): ValidationResult => {
  const hasError = value.length === 0;
  const errorText = hasError ? "REQUIRED" : " ";
  return { hasError, errorText };
};
