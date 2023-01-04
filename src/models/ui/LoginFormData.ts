import { FormFieldData } from "./FormFieldData";
import { CustomFormData } from "./CustomFormData";

export interface LoginFormData extends CustomFormData {
  username: FormFieldData;
  password: FormFieldData;
}
