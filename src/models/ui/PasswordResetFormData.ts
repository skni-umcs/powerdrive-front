import { CustomFormData } from "./CustomFormData";
import { FormFieldData } from "./FormFieldData";

export interface PasswordResetFormData extends CustomFormData {
  password: FormFieldData;
  repeatPassword: FormFieldData;
}
