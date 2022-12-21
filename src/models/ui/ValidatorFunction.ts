import { ValidationResult } from "./ValidationResult";

export interface ValidatorFunction {
  (value: string): ValidationResult;
}
