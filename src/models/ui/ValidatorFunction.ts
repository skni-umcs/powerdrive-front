import { ValidationResult } from "./ValidationResult";

export interface ValidatorFunction {
  (value: any): ValidationResult;
}
