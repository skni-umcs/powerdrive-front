import { ValidatorFunction } from "./ValidatorFunction";

export interface FormField<T> {
  value: T;
  hasError: boolean;
  errorText: string;
  validators: ValidatorFunction[];
}
