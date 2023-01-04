import { FormFieldData } from "./FormFieldData";
import { CustomFormData } from "./CustomFormData";

export interface RegisterFormData extends CustomFormData {
  email: FormFieldData;
  username: FormFieldData;
  name: FormFieldData;
  surname: FormFieldData;
  password: FormFieldData;
  repeatPassword: FormFieldData;
}
