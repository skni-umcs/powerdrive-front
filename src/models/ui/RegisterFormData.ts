import { FormFieldData } from "./FormFieldData";
import { CustomFormData } from "./CustomFormData";

export interface RegisterFormData extends CustomFormData {
  email: FormFieldData;
  username: FormFieldData;
  first_name: FormFieldData;
  last_name: FormFieldData;
  password: FormFieldData;
  repeatPassword: FormFieldData;
}
