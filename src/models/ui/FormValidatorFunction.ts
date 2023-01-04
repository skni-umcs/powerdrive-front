import { CustomFormData } from "./CustomFormData";
import { FormValidationError } from "./FormValidationError";

export interface FormValidatorFunction {
  (value: CustomFormData): FormValidationError[];
}
