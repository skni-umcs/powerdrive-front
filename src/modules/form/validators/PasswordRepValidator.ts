import { CustomFormData } from "../../../models/ui/CustomFormData";
import { FormValidationError } from "../../../models/ui/FormValidationError";

export const PasswordRepValidator = (
  form: CustomFormData
): FormValidationError[] => {
  const password = form.password.content;
  const passwordRep = form.repeatPassword.content;
  if (password !== passwordRep)
    return [{ fieldName: "repeatPassword", errorText: "PASSWORDS_MUST_MATCH" }];
  else return [];
};
