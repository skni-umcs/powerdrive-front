import { ValidatorFunction } from "./ValidatorFunction";

export interface FormFieldData {
  content: string;
  hasError: boolean;
  errorText: string;
  validators: ValidatorFunction[];
}
